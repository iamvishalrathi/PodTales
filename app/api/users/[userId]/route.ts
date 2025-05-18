import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const { userId } = params;

        // Get user data from Clerk
        const user = await clerkClient.users.getUser(userId);

        // Return only necessary information
        return NextResponse.json({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`.trim() || user.username || "Unknown User",
            imageUrl: user.imageUrl,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Failed to fetch user information" },
            { status: 500 }
        );
    }
}