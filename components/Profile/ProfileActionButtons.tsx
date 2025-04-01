import { Heart, Play, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileEditModal from "@/components/Profile/ProfileEditModal";

interface ProfileActionButtonsProps {
    isOwnProfile: boolean;
    isFollowing: boolean;
    hasPodcasts: boolean;
    toggleFollow: () => Promise<void>;
    playRandomPodcast: () => void;
    shareProfile: () => Promise<void>;
    clerkId: string;
    userName: string;
    userBio: string;
    userWebsite: string;
    userSocialLinks: Array<{ platform: string; url: string }>;
}

const ProfileActionButtons = ({
    isOwnProfile,
    isFollowing,
    hasPodcasts,
    toggleFollow,
    playRandomPodcast,
    shareProfile,
    clerkId,
    userName,
    userBio,
    userWebsite,
    userSocialLinks,
}: ProfileActionButtonsProps) => {
    return (
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            {!isOwnProfile && (
                <Button
                    onClick={toggleFollow}
                    className={`${isFollowing
                        ? 'bg-white-1/5 hover:bg-white-1/10 text-white-1 border border-white-1/10'
                        : 'bg-gradient-to-r from-orange-1 to-orange-600 hover:opacity-90 text-black font-medium'} 
            flex items-center gap-2 px-5 py-2.5 rounded-full shadow-md transition-all duration-200`}
                >
                    {isFollowing ? (
                        <>
                            <span className="relative flex h-2 w-2 mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-1 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-1"></span>
                            </span>
                            Following
                        </>
                    ) : (
                        <>
                            <Heart size={16} className={isFollowing ? "text-orange-1" : ""} />
                            Follow
                        </>
                    )}
                </Button>
            )}

            {hasPodcasts && (
                <Button
                    onClick={playRandomPodcast}
                    className="hidden sm:flex bg-black-1/50 hover:bg-black-1/70 text-white-1 items-center gap-2 px-5 py-2.5 rounded-full border border-gray-800"
                >
                    <Play size={16} className="text-orange-1" />
                    <span>Play Random</span>
                </Button>
            )}

            {isOwnProfile && (
                <ProfileEditModal
                    clerkId={clerkId}
                    initialName={userName}
                    initialBio={userBio}
                    initialWebsite={userWebsite}
                    initialSocialLinks={userSocialLinks}
                />
            )}

            <Button
                onClick={shareProfile}
                className="bg-black-1/50 hover:bg-black-1/70 text-white-1 flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-800"
            >
                <Share2 size={16} className="text-orange-1" />
                <span>Share Profile</span>
            </Button>
        </div>
    );
};

export default ProfileActionButtons;