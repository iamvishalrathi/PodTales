'use client';

import { SignedIn, UserButton, useUser, SignedOut } from '@clerk/nextjs'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Header from '@/components/Sidebars/RightSidebar/Header';
import Carousel from '@/components/Sidebars/RightSidebar/Carousel';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useAudio } from '@/providers/AudioProvider';
import { cn } from '@/lib/utils';
import { TopPodcastersProps } from '@/types';

// Reusable arrow component
const RightArrow = () => (
    <Image
        src="/icons/right-arrow.svg"
        alt="arrow"
        width={24}
        height={24}
        className="transition-transform duration-300 hover:translate-x-1 group-hover:translate-x-1"
    />
);

const RightSidebar = () => {
    const { user } = useUser();
    const topPodcasters = useQuery(api.users.getTopUsers);
    const isLoading = topPodcasters === undefined;
    const slides = topPodcasters?.filter((item: TopPodcastersProps) => item.totalPodcasts > 0);
    const router = useRouter();
    const { audio } = useAudio();

    return (
        <section className={cn('right_sidebar gap-8 h-[calc(100vh-5px)]', {
            'h-[calc(100vh-80px)]': audio?.audioUrl
        })}>
            {/* Profile Section */}
            {isLoading ? (
                <div className="flex gap-3">
                    <div className="flex items-center gap-3 w-full">
                        <div className="w-10 h-10 rounded-full bg-white-1/5 border border-white-1/10 animate-pulse"></div>
                        <div className="h-5 bg-white-1/10 rounded animate-pulse w-32"></div>
                    </div>
                    <RightArrow />
                </div>
            ) : (
                <Link href={`/profile/${user?.id}`} className="flex gap-3">
                    <SignedIn>
                        <div className="flex items-center gap-3 w-full">
                            <UserButton />
                            <h1 className="text-20 truncate font-semibold text-white-1">{user?.firstName} {user?.lastName}</h1>
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-3 w-full">
                            <div className="w-10 h-10 rounded-full bg-black-2 flex items-center justify-center overflow-hidden">
                                <Image
                                    src="/icons/profile.svg"
                                    alt="profile"
                                    width={26}
                                    height={26}
                                />
                            </div>
                            <h1 className="text-16 truncate font-semibold text-white-1">Sign In</h1>
                        </div>
                    </SignedOut>
                    <RightArrow />
                </Link>
            )}

            {/* Fans Like You Section */}
            <section className="w-full flex flex-col gap-2">
                <Header headerTitle="Fans Like You" />
                {isLoading ? (
                    <section className="flex w-full flex-col overflow-hidden pb-1">
                        <div className="flex">
                            <figure className="carousel_box relative">
                                <div className="absolute inset-0 rounded-xl bg-white-1/5 border border-white-1/10 animate-pulse"></div>
                                <div className="glassmorphism-black relative flex flex-col rounded-b-xl p-2">
                                    <div className="h-4 bg-white-1/10 rounded animate-pulse w-full mb-1"></div>
                                    <div className="h-3 bg-white-1/5 rounded animate-pulse w-3/4"></div>
                                </div>
                            </figure>
                        </div>
                        <div className="flex justify-center w-full mt-4 gap-2">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-full mx-1 ${i === 1 ? 'bg-orange-1 scale-125' : 'bg-[white]/30'
                                        }`}
                                />
                            ))}
                        </div>
                    </section>
                ) : !slides || slides.length === 0 ? (
                    <p className="text-sm text-white-3 italic py-2">No fans data available</p>
                ) : (
                    <div className="w-full">
                        <Carousel fansLikeDetail={slides} />
                    </div>
                )}
            </section>

            {/* Top Podcasters Section */}
            <section className="flex flex-col gap-2">
                <Header headerTitle="Top Podcasters" />
                {isLoading ? (
                    <div className="flex flex-col">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex cursor-pointer justify-between p-2 rounded-lg hover:bg-black-2/50 transition-all duration-300 ease-in-out"
                            >
                                <figure className="flex items-center gap-2">
                                    <div className="w-11 h-11 rounded-lg bg-white-1/5 border border-white-1/10 animate-pulse"></div>
                                    <div className="h-5 bg-white-1/10 rounded animate-pulse w-24"></div>
                                </figure>
                                <div className="flex items-center">
                                    <div className="h-4 bg-white-1/5 rounded animate-pulse w-16"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : !slides || slides.length === 0 ? (
                    <p className="text-sm text-white-3 italic py-2">No top podcasters available</p>
                ) : (
                    <div className="flex flex-col">
                        {slides.slice(0, 4).map((podcaster: TopPodcastersProps) => (
                            <div
                                key={podcaster._id}
                                className="flex cursor-pointer justify-between hover:bg-black-2/50 hover:scale-[1.02] p-2 rounded-lg transition-all duration-300 ease-in-out"
                                onClick={() => router.push(`/profile/${podcaster.clerkId}`)}
                            >
                                <figure className="flex items-center gap-2">
                                    <Image
                                        src={podcaster.imageUrl}
                                        alt={podcaster.name}
                                        width={44}
                                        height={44}
                                        className="aspect-square rounded-lg object-cover"
                                    />
                                    <h2 className="truncate text-14 font-semibold text-white-1 max-w-[100px]">{podcaster.name}</h2>
                                </figure>
                                <div className="flex items-center">
                                    <p className="text-12 font-normal text-white-1">{podcaster.totalPodcasts}&nbsp;&nbsp;{podcaster.totalPodcasts > 1 ? "podcasts" : "podcast"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </section>
    )
}

export default RightSidebar