import { PodcastProps } from "@/types";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import ListPodcastCard from "@/components/PodcastCard/ListPodcastCard";
import ListPodcastSkeleton from "@/components/PodcastCard/ListPodcastSkeleton";

interface LatestPodcastsProps {
    latestPodcasts: PodcastProps[] | undefined;
}

const LatestPodcasts = ({ latestPodcasts }: LatestPodcastsProps) => {
    return (
        <section className="flex flex-col gap-5 mt-12">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-orange-1/10 p-3 rounded-xl">
                        <Clock size={28} className="text-orange-1" />
                    </div>
                    <h1 className="text-2xl font-bold text-white-1">
                        Latest<span className="hidden md:inline"> Podcasts</span>
                    </h1>
                </div>
                <Link
                    href="/discover?filter=latest"
                    className="flex items-center gap-2 text-16 font-semibold text-orange-1 hover:text-orange-2 transition group"
                >
                    See all
                    <ArrowRight size={20} className="text-orange-1 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </header>
            <div className="flex flex-col gap-6">
                {latestPodcasts ? (
                    latestPodcasts.map((podcast, index) => (
                        <ListPodcastCard
                            key={podcast._id}
                            _id={podcast._id}
                            podcastTitle={podcast.podcastTitle}
                            imageUrl={podcast.imageUrl!}
                            views={podcast.views}
                            audioDuration={podcast.audioDuration}
                            author={podcast.author}
                            likeCount={podcast.likeCount}
                            index={index}
                        />
                    ))
                ) : (
                    <div className="flex flex-col gap-6">
                            {[...Array(3)].map((_, index) => (
                                <ListPodcastSkeleton key={index} />
                            ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LatestPodcasts;