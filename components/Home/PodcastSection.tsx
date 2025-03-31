import { PodcastProps } from "@/types";
import PodcastCard from "@/components/PodcastCard/GridPodcastCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PodcastCardSkeleton from "../PodcastCard/GridPodcastSkeleton";

interface PodcastSectionProps {
    title: string;
    icon: React.ReactNode;
    podcasts: PodcastProps[] | undefined;
    filterType: string;
}

const PodcastSection = ({ title, icon, podcasts, filterType }: PodcastSectionProps) => {
    // Split the title to separate "Podcasts" from the rest
    const titleParts = title.split(' Podcasts');
    
    return (
        <section className="flex flex-col gap-5 mt-12">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-orange-1/10 p-3 rounded-xl">
                        {icon}
                    </div>
                    <h1 className="text-2xl font-bold text-white-1">
                        {titleParts[0]}
                        <span className="hidden md:inline"> Podcasts</span>
                    </h1>
                </div>
                <Link
                    href={`/discover?filter=${filterType}`}
                    className="flex items-center gap-2 text-16 font-semibold text-orange-1 hover:text-orange-2 transition group"
                >
                    See all
                    <ArrowRight size={20} className="text-orange-1 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </header>
            <div className="podcast_grid">
                {podcasts ? (
                    podcasts.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                        <PodcastCard
                            key={_id}
                            imgUrl={imageUrl as string}
                            title={podcastTitle}
                            description={podcastDescription}
                            podcastId={_id}
                        />
                    ))
                ) : (
                    <>
                        {[...Array(3)].map((_, index) => (
                            <PodcastCardSkeleton key={index} />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
};

export default PodcastSection;