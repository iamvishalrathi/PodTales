"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PodcastInfoProps {
  title: string;
  author: string;
  imageUrl: string;
  podcastId?: string;
  variant?: "compact" | "fullscreen";
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  authorClassName?: string;
  showLink?: boolean;
}

const PodcastInfo = ({
  title,
  author,
  imageUrl,
  podcastId,
  variant = "compact",
  className,
  imageClassName,
  titleClassName,
  authorClassName,
  showLink = true,
}: PodcastInfoProps) => {
  const isCompact = variant === "compact";
  const isFullscreen = variant === "fullscreen";

  const imageSize = isCompact ? 40 : 96; // Smaller image for mobile
  const imageContainerClass = isCompact
    ? "aspect-square rounded-lg"
    : "relative w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(255,165,0,0.2)]";

  const titleClass = isCompact
    ? "text-sm font-bold text-[#ffffff] hover:text-primary transition-colors truncate max-w-[100px] sm:max-w-full"
    : "text-2xl md:text-3xl font-bold text-white-1 mb-2 line-clamp-2";

  const authorClass = isCompact
    ? "text-xs font-normal text-gray-400 truncate max-w-[120px] sm:max-w-full"
    : "text-lg md:text-xl text-gray-400 truncate";

  const renderImage = () => {
    if (isCompact) {
      return (
        <Image
          src={imageUrl || "/icons/logo.png"}
          width={imageSize}
          height={imageSize}
          alt="album-cover"
          className={cn("aspect-square rounded-lg hover:opacity-80 transition-opacity", imageClassName)}
        />
      );
    }

    return (
      <div className={cn(imageContainerClass, imageClassName)}>
        <Image
          src={imageUrl || "/icons/logo.png"}
          alt="album-cover"
          fill
          className="object-cover"
          priority={isFullscreen}
        />
        {isFullscreen && <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />}
      </div>
    );
  };

  const content = (
    <>
      {renderImage()}
      <div className={cn(
        isCompact ? "flex flex-col overflow-hidden" : "text-center md:text-left w-full",
        isFullscreen && "text-center md:text-left w-full"
      )}>
        <h2 className={cn(titleClass, titleClassName)}>
          {title}
        </h2>
        <p className={cn(authorClass, authorClassName)}>{author}</p>
      </div>
    </>
  );

  if (showLink && podcastId && isCompact) {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <Link href={`/podcasts/${podcastId}`}>
          {renderImage()}
        </Link>
        <div className="flex flex-col overflow-hidden">
          <h2 className={cn(titleClass, titleClassName)}>
            {title}
          </h2>
          <p className={cn(authorClass, authorClassName)}>{author}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      isCompact ? "flex items-center gap-4" : "",
      className
    )}>
      {content}
    </div>
  );
};

export default PodcastInfo;