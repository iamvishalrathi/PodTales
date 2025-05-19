import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all notifications for a user
export const getUserNotifications = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const notifications = await ctx.db
            .query("notifications")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .order("desc")
            .collect();

        // Enhance notifications with creator and podcast details
        const enhancedNotifications = await Promise.all(
            notifications.map(async (notification) => {
                // Get creator details
                const creator = await ctx.db
                    .query("users")
                    .filter((q) => q.eq(q.field("clerkId"), notification.creatorId))
                    .first();

                // For podcast notifications, get podcast details
                let podcast = null;
                if (notification.podcastId) {
                    podcast = await ctx.db
                        .query("podcasts")
                        .filter((q) => q.eq(q.field("_id"), notification.podcastId))
                        .first();
                }

                return {
                    ...notification,
                    creatorName: creator?.name || "Unknown Creator",
                    creatorImageUrl: creator?.imageUrl,
                    podcastTitle: podcast?.podcastTitle,
                    podcastImageUrl: podcast?.imageUrl,
                };
            })
        );

        return enhancedNotifications;
    },
});

// Create a new notification
export const createNotification = mutation({
    args: {
        userId: v.string(),
        creatorId: v.string(),
        type: v.string(),
        podcastId: v.optional(v.string()),
        message: v.optional(v.string()), // Add message parameter
    },
    handler: async (ctx, args) => {
        // Don't create notification if user is the creator
        if (args.userId === args.creatorId) {
            return null;
        }

        return await ctx.db.insert("notifications", {
            userId: args.userId,
            creatorId: args.creatorId,
            type: args.type,
            podcastId: args.podcastId,
            message: args.message, // Include message in the notification
            isRead: false,
        });
    },
});

// Mark a notification as read or unread (toggle)
export const markNotificationAsReadUnread = mutation({
    args: { notificationId: v.id("notifications") },
    handler: async (ctx, args) => {
        const notification = await ctx.db.get(args.notificationId);
        if (!notification) {
            throw new Error("Notification not found");
        }

        // Toggle the isRead status
        return await ctx.db.patch(args.notificationId, {
            isRead: !notification.isRead,
        });
    },
});

// Mark all notifications as read or unread for a user
export const markAllNotificationsAsReadUnread = mutation({
    args: {
        userId: v.string(),
        markAs: v.string() // "read" or "unread"
    },
    handler: async (ctx, args) => {
        // Get notifications based on current status (opposite of what we want to mark them as)
        const targetIsRead = args.markAs === "read";
        const notifications = await ctx.db
            .query("notifications")
            .filter((q) =>
                q.and(
                    q.eq(q.field("userId"), args.userId),
                    q.eq(q.field("isRead"), !targetIsRead) // Get notifications with opposite status
                )
            )
            .collect();

        for (const notification of notifications) {
            await ctx.db.patch(notification._id, {
                isRead: targetIsRead,
            });
        }

        return notifications.length;
    },
});

// Delete a single notification
export const deleteNotification = mutation({
    args: { notificationId: v.id("notifications") },
    handler: async (ctx, args) => {
        const notification = await ctx.db.get(args.notificationId);
        if (!notification) {
            throw new Error("Notification not found");
        }

        await ctx.db.delete(args.notificationId);
        return true;
    },
});

// Clear all notifications for a user
export const clearAllNotifications = mutation({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const notifications = await ctx.db
            .query("notifications")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .collect();

        for (const notification of notifications) {
            await ctx.db.delete(notification._id);
        }

        return notifications.length;
    },
});
