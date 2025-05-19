import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  podcasts: defineTable({
    user: v.id("users"),
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    audioUrl: v.optional(v.string()),
    audioStorageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    author: v.string(),
    authorId: v.string(),
    authorImageUrl: v.string(),
    voicePrompt: v.string(),
    imagePrompt: v.string(),
    voiceType: v.string(),
    audioDuration: v.float64(),
    views: v.float64(),
    podcastType: v.optional(v.string()),
    likes: v.optional(v.array(v.string())),
    likeCount: v.optional(v.float64()),
    averageRating: v.optional(v.float64()),
    ratingCount: v.optional(v.float64()),
    language: v.optional(v.string()), // Add language field
  })
    .searchIndex("search_author", { searchField: "author" })
    .searchIndex("search_title", { searchField: "podcastTitle" })
    .searchIndex("search_body", { searchField: "podcastDescription" }),

  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string(),
    followersCount: v.optional(v.number()),
    followingCount: v.optional(v.number()),
    bio: v.optional(v.string()),
    website: v.optional(v.string()),
    isVerified: v.optional(v.boolean()), // Add isVerified field
    socialLinks: v.optional(v.array(v.object({
      platform: v.string(),
      url: v.string()
    }))),
    isAdmin: v.optional(v.boolean()),
  }),
  ratings: defineTable({
    podcastId: v.id("podcasts"),
    userId: v.string(),
    rating: v.number(),
    createdAt: v.string(),
  })
    .index("by_podcast", ["podcastId"])
    .index("by_user_and_podcast", ["userId", "podcastId"]),

  comments: defineTable({
    podcastId: v.id("podcasts"),
    userId: v.string(),
    userName: v.string(),
    userImageUrl: v.string(),
    content: v.string(),
    createdAt: v.string(),
  })
    .index("by_podcast", ["podcastId"])
    .index("by_user", ["userId"]),

  follows: defineTable({
    follower: v.string(), // The clerkId of the user who is following
    following: v.string(), // The clerkId of the user being followed
    createdAt: v.number(), // Timestamp when the follow relationship was created
  })
    .index("by_follower", ["follower"])
    .index("by_following", ["following"])
    .index("by_follower_and_following", ["follower", "following"]),

  notifications: defineTable({
    userId: v.string(),
    creatorId: v.string(),
    type: v.string(),
    podcastId: v.optional(v.id("podcasts")),
    isRead: v.boolean(),
    _creationTime: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_creator", ["creatorId"])
    .index("by_podcast", ["podcastId"]),

  reports: defineTable({
    podcastId: v.id("podcasts"),
    podcastTitle: v.string(),
    reportType: v.string(), // inappropriate, copyright, offensive, misinformation, other
    details: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    reportedBy: v.optional(v.string()), // Changed to string for Clerk user ID
    status: v.string(), // pending, reviewed, resolved, dismissed
    reviewedBy: v.optional(v.string()), // Changed to string for Clerk user ID
    reviewNotes: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_podcast", ["podcastId"]),
    
  adminRequests: defineTable({
    userId: v.string(),
    reason: v.string(),
    status: v.string(), // "pending", "approved", "rejected"
    createdAt: v.string(),
    reviewedAt: v.optional(v.string()),
    reviewedBy: v.optional(v.string()),
    reviewNotes: v.optional(v.string()),
  })
});
