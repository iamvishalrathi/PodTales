"use client";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Play, MoreVertical, Trash2, Heart, Share2, Check } from 'lucide-react';
import MusicBars from '../MusicBars';

import { api } from "@/convex/_generated/api";
import { useAudio } from '@/providers/AudioProvider';
import { PodcastDetailProps } from "@/types";

import LoaderSpinner from "../LoaderSpinner";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useUser } from "@clerk/nextjs";

const PodcastDetail = ({
  audioUrl,
  podcastTitle,
  author,
  imageUrl,
  podcastId,
  imageStorageId,
  audioStorageId,
  isOwner,
  authorImageUrl,
  authorId,
  likes = [],
}: PodcastDetailProps) => {
  const router = useRouter();
  const { audio, setAudio } = useAudio();
  const { toast } = useToast();
  const { user } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length || 0);
  const [isCopied, setIsCopied] = useState(false);

  const deletePodcast = useMutation(api.podcasts.deletePodcast);
  const likePodcast = useMutation(api.podcasts.likePodcast);
  
  // Get updated podcast details including likes
  const podcast = useQuery(
    api.podcasts.getPodcastById,
    podcastId ? { podcastId } : "skip"
  );

  // Update isLiked state when podcast data is loaded or user changes
  useEffect(() => {
    if (podcast && user) {
      setIsLiked(podcast.likes?.includes(user.id) || false);
      setLikeCount(podcast.likes?.length || 0);
    }
  }, [podcast, user]);

  const handleDelete = async () => {
    try {
      await deletePodcast({ podcastId, imageStorageId, audioStorageId });
      router.push("/");
    } catch (error) {
      console.error("Error deleting podcast", error);
    }
  };

  // Handle like functionality with optimistic updates
  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Please sign in to like podcasts",
        variant: "destructive",
      });
      return;
    }

    try {
      // Optimistic UI update for like status and count
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      setLikeCount(prevCount => newLikedState ? prevCount + 1 : prevCount - 1);
      
      // Make API call
      await likePodcast({ 
        podcastId, 
        userId: user.id 
      });
    } catch (error) {
      // Revert optimistic updates on error
      setIsLiked(isLiked);
      setLikeCount(prevCount => isLiked ? prevCount + 1 : prevCount - 1);
      toast({
        title: "Failed to update like status",
        variant: "destructive",
      });
      console.error("Error liking podcast:", error);
    }
  };

  const handlePlay = () => {
    setAudio({
      title: podcastTitle,
      audioUrl,
      imageUrl,
      author,
      podcastId,
    });
  };

  // Share podcast function
  const sharePodcast = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: podcastTitle || "Check out this podcast",
          text: `Listen to ${podcastTitle} by ${author} on PodTales!`,
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);

      toast({
        title: "Link Copied!",
        description: "Podcast link copied to clipboard",
        duration: 3000,
      });
    }
  };

  const isPlaying = audio?.podcastId === podcastId;

  if (!imageUrl || !authorImageUrl) return <LoaderSpinner />;

  return (
    <div className="w-full bg-black-1/30 p-4 sm:p-6 rounded-xl border border-gray-800">
      <div className="flex w-full justify-between max-md:flex-col max-md:items-center gap-6 sm:gap-8">
        <div className="flex flex-col gap-6 sm:gap-8 max-md:items-center md:flex-row">
          {/* Thumbnail */}
          <div className="relative group">
            <Image
              src={imageUrl}
              width={250}
              height={250}
              alt="Podcast image"
              className="w-[200px] sm:w-[250px] aspect-square rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </div>

          {/* Content */}
          <div className="flex w-full flex-col gap-4 sm:gap-5 max-md:items-center md:gap-6">
            <article className="flex flex-col gap-3 max-md:items-center">
              <h1 className="text-2xl sm:text-32 font-extrabold tracking-[-0.32px] text-white-1 transition-colors duration-200 hover:text-orange-1 text-center md:text-left">
                {podcastTitle}
              </h1>
              <figure
                className="flex cursor-pointer items-center gap-3 bg-black-1/50 px-4 py-2 rounded-full transition-all duration-200 hover:bg-black-1/70"
                onClick={() => {
                  router.push(`/profile/${authorId}`);
                }}
              >
                <Image
                  src={authorImageUrl}
                  width={30}
                  height={30}
                  alt="Caster icon"
                  className="size-[30px] rounded-full object-cover ring-2 ring-orange-1/30"
                />
                <h2 className="text-16 font-medium text-white-3">{author}</h2>
              </figure>
            </article>

            <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center md:justify-start">
              <Button
                variant="ghost"
                size="icon"
                className={`size-10 sm:size-12 rounded-full transition-all duration-200 hover:scale-105 flex items-center justify-center ${isPlaying
                    ? "bg-black text-orange-1 hover:bg-black/90"
                    : "bg-orange-1 text-white-1 hover:bg-orange-1/90"
                  }`}
                onClick={handlePlay}
              >
                {isPlaying ? (
                  <MusicBars />
                ) : (
                  <Play className="size-5 sm:size-6" />
                )}
              </Button>

              <button
                onClick={sharePodcast}
                className="flex items-center gap-1 sm:gap-2 bg-black-1/50 hover:bg-black-1/70 transition-colors px-3 sm:px-4 py-2 rounded-full cursor-pointer min-w-[90px] sm:min-w-[100px] justify-center"
              >
                {isCopied ? (
                  <Check size={18} stroke="white" />
                ) : (
                  <Share2 size={18} stroke="white" />
                )}
                <span className="text-14 font-medium text-white-2 w-[45px] text-center">
                  {isCopied ? "Copied!" : "Share"}
                </span>
              </button>

              <Button
                onClick={handleLike}
                className={`flex items-center gap-1 sm:gap-2 px-3 min-w-[70px] ${isLiked
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-black-1/50 hover:bg-black-1/70"
                  } text-white-1 transition-colors`}
              >
                <Heart
                  size={18}
                  className={`transition-transform ${isLiked ? "fill-current" : ""}`}
                />
                <span className="w-[20px] text-center">
                  {likeCount}
                </span>
              </Button>

              {isOwner && (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-black-1/50 size-10 sm:size-12 text-white-2 hover:text-red-500"
                    onClick={handleDelete}
                  >
                    <Trash2 size={18} stroke="currentColor" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastDetail;
