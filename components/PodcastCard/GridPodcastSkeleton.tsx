import React from 'react'

interface GridPodcastSkeletonProps {
    usage?: 'discover' | 'default'
}

const GridPodcastSkeleton = ({ usage = 'default' }: GridPodcastSkeletonProps) => {
    const isDiscover = usage === 'discover'

    return (
        <div className="bg-white-1/5 rounded-xl p-3 border border-white-1/10 shadow-md flex flex-col h-full w-full">
            <figure className="flex flex-col gap-3 h-full w-full">
                <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-white-1/10 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-br from-white-1/5 to-transparent"></div>
                </div>
                <div className="flex flex-col flex-1 w-full">
                    {/* Title skeleton */}
                    <div className="h-5 sm:h-6 bg-white-1/10 rounded-md animate-pulse w-4/5" />

                    {/* Description skeleton - two lines */}
                    <div className="h-3 sm:h-4 bg-white-1/10 rounded-md animate-pulse w-full mt-1" />
                    <div className="h-3 sm:h-4 bg-white-1/10 rounded-md animate-pulse w-3/4 mt-1" />

                    {/* Category and language badges skeleton - only for discover */}
                    {isDiscover && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            <div className="h-5 sm:h-6 bg-orange-1/10 rounded-full animate-pulse w-16 sm:w-20" />
                            <div className="h-5 sm:h-6 bg-white-1/10 rounded-full animate-pulse w-12 sm:w-16" />
                        </div>
                    )}

                    {/* Stats display skeleton - only for discover */}
                    {isDiscover && (
                        <div className="flex items-center justify-between mt-auto pt-2">
                            <div className="flex items-center gap-1 sm:gap-3">
                                <div className="flex items-center gap-1">
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white-1/10 animate-pulse" />
                                    <div className="h-2.5 sm:h-3 bg-white-1/10 rounded-md animate-pulse w-[20px] sm:w-[30px]" />
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white-1/10 animate-pulse" />
                                    <div className="h-2.5 sm:h-3 bg-white-1/10 rounded-md animate-pulse w-[20px] sm:w-[30px]" />
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white-1/10 animate-pulse" />
                                    <div className="h-2.5 sm:h-3 bg-white-1/10 rounded-md animate-pulse w-[20px] sm:w-[30px]" />
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white-1/10 animate-pulse" />
                                <div className="h-2.5 sm:h-3 bg-white-1/10 rounded-md animate-pulse w-[30px] sm:w-[40px]" />
                            </div>
                        </div>
                    )}
                </div>
            </figure>
        </div>
    )
}

export default GridPodcastSkeleton