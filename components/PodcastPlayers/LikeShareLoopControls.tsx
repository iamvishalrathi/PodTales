"use client";
import { Heart, Share2, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface LikeShareLoopControlsProps {
    podcastId?: string;
    title: string;
    author: string;
    variant?: "compact" | "fullscreen";
    className?: string;
    isLooping?: boolean;
    toggleLoop?: () => void;
    showLoopControl?: boolean;
    showShareControl?: boolean; // New prop for mobile view
}

const LikeShareLoopControls = ({
    podcastId,
    title,
    author,
    variant = "compact",
    className,
    isLooping = false,
    toggleLoop,
    showLoopControl = true,
    showShareControl = true, // Default to true
}: LikeShareLoopControlsProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const { user } = useUser();
    const isFullscreen = variant === "fullscreen";

    // Get podcast details including likes
    const podcast = useQuery(
        api.podcasts.getPodcastById,
        podcastId ? { podcastId } : "skip"
    );

    // Like mutation
    const likePodcast = useMutation(api.podcasts.likePodcast);

    // Update isLiked state when podcast data is loaded
    useEffect(() => {
        if (podcast && user) {
            setIsLiked(podcast.likes?.includes(user.id) || false);
        }
    }, [podcast, user]);

    // Handle like functionality
    const handleLike = async () => {
        if (!podcastId || !user) {
            toast.error("You must be logged in to like podcasts");
            return;
        }

        try {
            // Optimistic UI update
            setIsLiked(!isLiked);
            
            // Make API call
            await likePodcast({
                podcastId,
                userId: user.id
            });
        } catch (error) {
            // Revert optimistic update on error
            setIsLiked(isLiked);
            toast.error("Failed to update like status");
            console.error("Error liking podcast:", error);
        }
    };

    // Handle share functionality
    const handleShare = async () => {
        if (!title) return;

        // Create share data
        const shareData = {
            title,
            text: `Listen to ${title} by ${author} on PodTales`,
            url: podcastId
                ? `${window.location.origin}/podcasts/${podcastId}`
                : window.location.origin
        };

        // Check if Web Share API is available
        if (navigator.share && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    toast.error("Error sharing content");
                    console.error("Error sharing:", error);
                }
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(shareData.url)
                .then(() => toast.success("Link copied to clipboard"))
                .catch(() => toast.error("Failed to copy link"));
        }
    };

    return (
        <div className={cn(
            "flex items-center", 
            isFullscreen ? "gap-4" : "gap-2 sm:gap-4", // Reduced gap on mobile
            className
        )}>
            {showLoopControl && toggleLoop && (
                <button
                    onClick={toggleLoop}
                    className={cn(
                        "rounded-full p-1.5 sm:p-2 transition-colors", // Adjusted padding for mobile
                        isFullscreen ? "hover:bg-gray-800/50" : "hover:bg-gray-800",
                        isLooping 
                            ? isFullscreen ? "text-orange-1" : "text-orange-500" 
                            : isFullscreen ? "text-white-1 hover:text-white" : "text-[#ffffff] hover:text-white"
                    )}
                    title={`Toggle Loop ${isFullscreen ? "(L)" : ""}`}
                >
                    <Repeat className={isFullscreen ? "h-6 w-6" : "h-4 w-4 sm:h-5 sm:w-5"} />
                </button>
            )}
            
            <button
                onClick={handleLike}
                className={cn(
                    "rounded-full p-1.5 sm:p-2 transition-colors", // Adjusted padding for mobile
                    isFullscreen ? "hover:bg-gray-800/50" : "hover:bg-gray-800",
                    isLiked
                        ? isFullscreen ? "text-orange-1" : "text-orange-500"
                        : isFullscreen ? "text-white-1 hover:text-orange-1" : "text-[#ffffff] hover:text-white"
                )}
                title="Like Podcast"
                disabled={!user}
            >
                <Heart
                    className={cn(
                        isFullscreen ? "h-6 w-6" : "h-4 w-4 sm:h-5 sm:w-5", // Smaller icon on mobile
                        isLiked && (isFullscreen ? "fill-orange-1" : "fill-orange-500")
                    )}
                />
            </button>

            {showShareControl && (
                <button
                    onClick={handleShare}
                    className={cn(
                        "rounded-full p-1.5 sm:p-2 transition-colors", // Adjusted padding for mobile
                        isFullscreen
                            ? "text-white-1 hover:bg-gray-800/50 hover:text-orange-1"
                            : "text-[#ffffff] hover:bg-gray-800 hover:text-white"
                    )}
                    title="Share Podcast"
                >
                    <Share2 className={isFullscreen ? "h-6 w-6" : "h-4 w-4 sm:h-5 sm:w-5"} />
                </button>
            )}
        </div>
    );
};

export default LikeShareLoopControls;