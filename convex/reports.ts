import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Submit a new report
export const submitReport = mutation({
    args: {
        podcastId: v.id("podcasts"),
        podcastTitle: v.string(),
        reportType: v.string(),
        details: v.optional(v.string()),
        contactEmail: v.optional(v.string()),
        reportedBy: v.string(), // User's Clerk ID who reported
    },
    handler: async (ctx, args) => {
        const reportId = await ctx.db.insert("reports", {
            podcastId: args.podcastId,
            podcastTitle: args.podcastTitle,
            reportType: args.reportType,
            details: args.details,
            contactEmail: args.contactEmail,
            reportedBy: args.reportedBy,
            status: "pending",
        });

        return reportId;
    },
});

// Get reports for admin review (would be protected by authorization)
export const getReports = query({
    args: {
        status: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        if (args.status) {
            return await ctx.db
                .query("reports")
                .filter((q) => q.eq(q.field("status"), args.status))
                .order("desc")
                .collect();
        }

        return await ctx.db
            .query("reports")
            .order("desc")
            .collect();
    },
});

// Update report status
export const updateReportStatus = mutation({
    args: {
        reportId: v.id("reports"),
        status: v.string(),
        reviewNotes: v.optional(v.string()),
        reviewedBy: v.id("users"),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.reportId, {
            status: args.status,
            reviewNotes: args.reviewNotes,
            reviewedBy: args.reviewedBy,
        });

        return args.reportId;
    },
});

// Get total number of reports
export const getTotalReports = query({
    args: {},
    handler: async (ctx) => {
        const reports = await ctx.db.query("reports").collect();
        return reports.length;
    },
});

// Get count of pending reports
export const getPendingReportsCount = query({
    args: {},
    handler: async (ctx) => {
        const pendingReports = await ctx.db
            .query("reports")
            .filter((q) => q.eq(q.field("status"), "pending"))
            .collect();
        return pendingReports.length;
    },
});