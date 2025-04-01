import Image from "next/image";
import { User, Mic, Users, Headphones, Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/Profile/StatCard";

interface ProfileHeaderProps {
    user: {
        name?: string;
        imageUrl?: string;
        _creationTime?: number;
        isVerified?: boolean;
    };
    podcastCount: number;
    totalViews: number;
    totalLikes: number;
    averageRating: string;
    isFollowing: boolean;
    followersCount: number | undefined;
    followingCount: number | undefined;
}

const ProfileHeader = ({
    user,
    podcastCount,
    totalViews,
    totalLikes,
    averageRating,
    isFollowing,
    followersCount,
    followingCount,
}: ProfileHeaderProps) => {
    return (
        <div className="relative w-full rounded-2xl overflow-hidden mb-8 shadow-lg">
            {/* Banner Background */}
            <div className="h-32 sm:h-56 bg-gradient-to-r from-orange-1/30 via-purple-600/30 to-blue-600/20 relative">
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>

            {/* Mobile Profile Info */}
            <div className="md:hidden relative px-4 pb-4 -mt-16 flex flex-col items-center">
                {/* Profile Image */}
                <div className="relative z-10">
                    <div className="size-28 rounded-full shadow-xl overflow-hidden group">
                        {user?.imageUrl ? (
                            <Image
                                src={user.imageUrl}
                                alt={user.name || "Profile"}
                                fill
                                className="object-cover transition-transform group-hover:scale-110 rounded-full"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <User size={32} className="text-white-1" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Details */}
                <div className="flex flex-col items-center mt-3 w-full">
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        <h1 className="text-xl font-bold text-white-1 drop-shadow-sm tracking-tight flex items-center">
                            <span className="truncate max-w-[200px]">{user?.name || "User"}</span>
                            {user?.isVerified && (
                                <Image
                                    src="/icons/verified.svg"
                                    alt="Verified"
                                    width={16}
                                    height={16}
                                    className="inline-block ml-1 flex-shrink-0 mt-1"
                                />
                            )}
                        </h1>
                        {isFollowing && (
                            <Badge variant="outline" className="border-orange-1 text-orange-1 text-xs">
                                Following
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-3 text-xs text-white-2">
                        {/* Podcast count */}
                        <span className="flex items-center gap-1">
                            <Mic size={14} className="text-orange-1" />
                            <span>{podcastCount}</span>
                        </span>
                        {/* Followers count */}
                        {followersCount !== undefined && (
                            <span className="flex items-center gap-1">
                                <User size={14} className="text-orange-1" />
                                <span>{followersCount}</span>
                            </span>
                        )}
                        {/* Following count */}
                        {followingCount !== undefined && (
                            <span className="flex items-center gap-1">
                                <Users size={14} className="text-orange-1" />
                                <span>{followingCount}</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop Profile Info */}
            <div className="hidden md:flex relative px-6 sm:px-8 pb-8 -mt-24 flex-col md:flex-row md:items-end gap-8">
                {/* Profile Image */}
                <div className="relative z-10">
                    <div className="size-36 sm:size-40 rounded-full shadow-xl overflow-hidden group">
                        {user?.imageUrl ? (
                            <Image
                                src={user.imageUrl}
                                alt={user.name || "Profile"}
                                fill
                                className="object-cover transition-transform group-hover:scale-110 rounded-full"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <User size={48} className="text-white-1" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Details */}
                <div className="flex flex-col md:flex-1 mt-3 md:mt-0">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white-1 drop-shadow-sm tracking-tight flex items-center">
                            <span className="truncate max-w-[280px] sm:max-w-[400px]">{user?.name || "User"}</span>
                            {user?.isVerified && (
                                <Image
                                    src="/icons/verified.svg"
                                    alt="Verified"
                                    width={20}
                                    height={20}
                                    className="inline-block ml-2 flex-shrink-0 mt-2"
                                />
                            )}
                        </h1>
                        {isFollowing && (
                            <Badge variant="outline" className="border-orange-1 text-orange-1 mt-2">
                                Following
                            </Badge>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-6 mt-3">
                        <div className="text-white-2 flex flex-col gap-2 text-sm sm:text-base">
                            {/* Podcast count */}
                            <span className="flex items-center gap-2">
                                <Mic size={16} className="text-orange-1" />
                                <span className="font-medium">{podcastCount} {podcastCount <= 1 ? 'Podcast' : 'Podcasts'}</span>
                            </span>
                            {/* Followers count */}
                            {followersCount !== undefined && (
                                <span className="flex items-center gap-2">
                                    <User size={16} className="text-orange-1" />
                                    <span>{followersCount} {followersCount === 1 ? 'Follower' : 'Followers'}</span>
                                </span>
                            )}
                            {/* Following count */}
                            {followingCount !== undefined && (
                                <span className="flex items-center gap-2">
                                    <Users size={16} className="text-orange-1" />
                                    <span>{followingCount} Following</span>
                                </span>
                            )}
                        </div>

                        {/* Stats Cards - Desktop */}
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <StatCard icon={<Headphones size={20} />} value={totalViews.toLocaleString()} label="Total Views" />
                            <StatCard icon={<Heart size={20} />} value={totalLikes.toLocaleString()} label="Total Likes" />
                            <StatCard icon={<Star size={20} />} value={averageRating} label="Avg Rating" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards - Mobile */}
            <div className="flex md:hidden gap-2 px-4 mt-3 overflow-x-auto pb-4 snap-x">
                <StatCard icon={<Headphones size={16} />} value={totalViews.toLocaleString()} label="Views" />
                <StatCard icon={<Heart size={16} />} value={totalLikes.toLocaleString()} label="Likes" />
                <StatCard icon={<Star size={16} />} value={averageRating} label="Rating" />
            </div>
        </div>
    );
};

export default ProfileHeader;