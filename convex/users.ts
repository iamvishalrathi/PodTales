import { ConvexError, v } from "convex/values";
import { internalMutation, query, mutation } from "./_generated/server";

export const getUserById = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique();

        if (!user) {
            throw new ConvexError("User not found");
        }

        return user;
    },
});

// Enhanced query to get top users by multiple parameters
export const getTopUsers = query({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();

        const userData = await Promise.all(
            users.map(async (u) => {
                const podcasts = await ctx.db
                    .query("podcasts")
                    .filter((q) => q.eq(q.field("authorId"), u.clerkId))
                    .collect();

                // Get followers count
                const followers = await ctx.db
                    .query("follows")
                    .withIndex("by_following", (q) => q.eq("following", u.clerkId))
                    .collect();

                // Calculate total views and likes across all podcasts
                const totalViews = podcasts.reduce((sum, p) => sum + (p.views || 0), 0);
                const totalLikes = podcasts.reduce((sum, p) => sum + (p.likeCount || 0), 0);
                
                // Calculate average rating if available
                const podcastsWithRatings = podcasts.filter(p => p.averageRating && p.ratingCount && p.ratingCount > 0);
                const avgRating = podcastsWithRatings.length > 0 
                    ? podcastsWithRatings.reduce((sum, p) => sum + (p.averageRating || 0), 0) / podcastsWithRatings.length
                    : 0;
                
                // Sort podcasts by a combined score of views, likes and recency
                const sortedPodcasts = podcasts.sort((a, b) => {
                    const aScore = (a.views || 0) * 0.5 + (a.likeCount || 0) * 2;
                    const bScore = (b.views || 0) * 0.5 + (b.likeCount || 0) * 2;
                    return bScore - aScore;
                });

                return {
                    ...u,
                    totalPodcasts: podcasts.length,
                    totalViews,
                    totalLikes,
                    averageRating: avgRating,
                    followersCount: followers.length,
                    // Maintain the same structure for compatibility with RightSidebar
                    podcast: sortedPodcasts.map((p) => ({
                        podcastTitle: p.podcastTitle,
                        podcastId: p._id,
                        podcastImage: p.imageUrl || u.imageUrl // Add podcast image
                    })),
                };
            })
        );

        // Calculate a combined score for each user based on multiple factors
        const scoredUsers = userData.map(user => {
            const podcastCountScore = user.totalPodcasts * 10;
            const viewsScore = user.totalViews * 0.2;
            const likesScore = user.totalLikes * 2;
            const ratingScore = user.averageRating * 15;
            const followersScore = user.followersCount * 5; // Add followers score
            
            const totalScore = podcastCountScore + viewsScore + likesScore + ratingScore + followersScore;
            
            return {
                ...user,
                score: totalScore
            };
        });

        // Sort by the combined score instead of just podcast count
        return scoredUsers.sort((a, b) => b.score - a.score);
    },
});

export const createUser = internalMutation({
    args: {
        clerkId: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("users", {
            clerkId: args.clerkId,
            email: args.email,
            imageUrl: args.imageUrl,
            name: args.name,
        });
    },
});

export const updateUser = internalMutation({
    args: {
        clerkId: v.string(),
        imageUrl: v.string(),
        email: v.string(),
    },
    async handler(ctx, args) {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique();

        if (!user) {
            throw new ConvexError("User not found");
        }

        await ctx.db.patch(user._id, {
            imageUrl: args.imageUrl,
            email: args.email,
        });

        const podcast = await ctx.db
            .query("podcasts")
            .filter((q) => q.eq(q.field("authorId"), args.clerkId))
            .collect();

        await Promise.all(
            podcast.map(async (p) => {
                await ctx.db.patch(p._id, {
                    authorImageUrl: args.imageUrl,
                });
            })
        );
    },
});

export const deleteUser = internalMutation({
    args: { clerkId: v.string() },
    async handler(ctx, args) {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique();

        if (!user) {
            throw new ConvexError("User not found");
        }

        await ctx.db.delete(user._id);
    },
});

export const updateUserProfile = mutation({
  args: {
    clerkId: v.string(),
    name: v.optional(v.string()),  // Add this line to accept the name parameter
    bio: v.optional(v.string()),
    website: v.optional(v.string()),
    socialLinks: v.optional(
      v.array(
        v.object({
          platform: v.string(),
          url: v.string(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    // Update the patch operation to include the name field if provided
    await ctx.db.patch(user._id, {
      name: args.name !== undefined ? args.name : user.name,
      bio: args.bio,
      website: args.website,
      socialLinks: args.socialLinks,
    });

    return { success: true };
  },
});


// Check if a user is an admin
export const isUserAdmin = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("clerkId"), args.userId))
      .first();
    
    return user?.isAdmin === true;
  },
});

// Set user as admin (for authorized users only)
export const setUserAdmin = mutation({
  args: { 
    userId: v.string(),
    isAdmin: v.boolean(),
    requestingUserId: v.string() 
  },
  handler: async (ctx, args) => {
    // Security check: Only existing admins can set admin status
    const requestingUser = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("clerkId"), args.requestingUserId))
      .first();
    
    if (!requestingUser?.isAdmin) {
      throw new Error("Unauthorized: Only admins can set admin status");
    }
    
    // Find the user to update
    const userToUpdate = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("clerkId"), args.userId))
      .first();
    
    if (!userToUpdate) {
      throw new Error("User not found");
    }
    
    // Update the user's admin status
    await ctx.db.patch(userToUpdate._id, { isAdmin: args.isAdmin });
    
    return { success: true };
  },
});