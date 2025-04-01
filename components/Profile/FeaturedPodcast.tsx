import Image from "next/image";
import { Headphones, Heart, Star, Clock, Play, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AudioProps, PodcastProps } from "@/types";

interface FeaturedPodcastProps {
    podcast: PodcastProps;
    setAudio: (audio: AudioProps) => void;
}

const FeaturedPodcast = ({ podcast, setAudio }: FeaturedPodcastProps) => {
    const router = useRouter();

    if (!podcast) return null;

    return (
        <section className="my-10">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-1/10 p-2 rounded-lg">
                    <Award size={20} className="text-orange-1" />
                </div>
                <h2 className="text-xl font-bold text-white-1">Featured Podcast</h2>
            </div>

            <div className="bg-white-1/5 rounded-xl p-4 border border-white-1/10">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 lg:w-1/4 aspect-square relative rounded-lg overflow-hidden">
                        <Image
                            src={podcast.imageUrl || '/placeholder.png'}
                            alt={podcast.podcastTitle || 'Featured Podcast'}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <Button
                            className="absolute bottom-3 left-3 bg-orange-1 hover:bg-orange-1/90 rounded-full size-12 flex items-center justify-center p-0"
                            onClick={() => {
                                setAudio({
                                    title: podcast.podcastTitle || "",
                                    audioUrl: podcast.audioUrl || "",
                                    imageUrl: podcast.imageUrl || "",
                                    author: podcast.author || "",
                                    podcastId: podcast._id,
                                });
                            }}
                        >
                            <Play size={24} className="ml-1" />
                        </Button>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white-1 mb-2">{podcast.podcastTitle || 'Featured Podcast'}</h3>
                        <p className="text-white-2 text-sm mb-4 line-clamp-3">
                            {podcast.podcastDescription || 'No description available'}
                        </p>

                        <div className="hidden sm:flex flex-wrap gap-4 text-sm text-white-2">
                            <div className="flex items-center gap-1">
                                <Headphones size={16} className="text-orange-1" />
                                <span>{podcast.views?.toLocaleString() || 0} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Heart size={16} className="text-orange-1" />
                                <span>{podcast.likeCount?.toLocaleString() || 0} likes</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star size={16} className="text-orange-1" />
                                <span>{podcast.averageRating ? Number(podcast.averageRating).toFixed(1) : "0.0"} rating</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={16} className="text-orange-1" />
                                <span>{new Date(podcast._creationTime).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <Button
                                className="bg-orange-1 hover:bg-orange-1/90 text-white-1"
                                onClick={() => {
                                    setAudio({
                                        title: podcast.podcastTitle || "",
                                        audioUrl: podcast.audioUrl || "",
                                        imageUrl: podcast.imageUrl || "",
                                        author: podcast.author || "",
                                        podcastId: podcast._id,
                                    });
                                }}
                            >
                                <Play size={16} className="mr-2" /> Play Now
                            </Button>
                            <Button
                                variant="outline"
                                className="border-white-1/20 text-white-1 hover:bg-white-1/10"
                                onClick={() => {
                                    router.push(`/podcasts/${podcast._id}`);
                                }}
                            >
                                View Details
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPodcast;