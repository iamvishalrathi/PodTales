import { useState } from 'react';
import { Star, ChartBar } from 'lucide-react';
import DetailSection from './SectionDetail';

interface RatingSectionProps {
    podcast: {
        ratingCount?: number;
        averageRating?: number;
    };
    userRating: number | null;
    hoveredRating: number | null;
    hasRated: boolean;
    ratingDistribution: Record<number, number> | undefined;
    setUserRating: (rating: number) => void;
    setHoveredRating: (rating: number | null) => void;
    setHasRated: (hasRated: boolean) => void;
    handleRatingSubmit: () => void;
}

const RatingSection = ({
    podcast,
    userRating,
    hoveredRating,
    hasRated,
    ratingDistribution,
    setUserRating,
    setHoveredRating,
    setHasRated,
    handleRatingSubmit
}: RatingSectionProps) => {
    const [showRatingAnalysis, setShowRatingAnalysis] = useState(false);

    const ratingControls = (
        <div className="flex items-center gap-2">
            {podcast?.ratingCount && podcast.ratingCount > 0 && (
                <>
                    <div className="flex items-center gap-2 bg-black-1/50 px-3 sm:px-4 py-2 rounded-full">
                        <Star size={18} stroke="white" fill="orange" />
                        <span className="text-14 font-medium text-white-2">
                            <span className="hidden sm:inline">{podcast.averageRating?.toFixed(1)} ({podcast.ratingCount} ratings)</span>
                            <span className="sm:hidden">{podcast.averageRating?.toFixed(1)}</span>
                        </span>
                    </div>
                    <button
                        onClick={() => setShowRatingAnalysis(!showRatingAnalysis)}
                        className="flex items-center gap-2 bg-black-1/50 px-3 sm:px-4 py-2 rounded-full hover:bg-white-1/10 transition-colors"
                    >
                        <ChartBar size={18} stroke="white" />
                        <span className="text-14 font-medium text-white-2 hidden sm:inline">
                            {showRatingAnalysis ? "Hide Analysis" : "Show Analysis"}
                        </span>
                    </button>
                </>
            )}
        </div>
    );

    return (
        <DetailSection title={<span><span className="hidden sm:inline">Rate this Podcast</span><span className="sm:hidden">Rate</span></span>} rightElement={ratingControls}>
            {showRatingAnalysis && podcast?.ratingCount && podcast.ratingCount > 0 && (
                <div className="mb-6 bg-black-1/50 p-4 rounded-lg border border-white-1/10 animate-fadeIn">
                    <h3 className="text-white-1 font-medium mb-3">Rating Distribution</h3>
                    <div className="space-y-2">
                        {ratingDistribution && [5, 4, 3, 2, 1].map((star) => {
                            const count = ratingDistribution[star as keyof typeof ratingDistribution] || 0;
                            const percentage = podcast.ratingCount && podcast.ratingCount > 0
                                ? Math.round((count / podcast.ratingCount) * 100)
                                : 0;

                            return (
                                <div key={star} className="flex items-center gap-3">
                                    <div className="flex items-center w-16">
                                        <span className="text-white-2 font-medium">{star}</span>
                                        <Star size={16} className="ml-1 fill-orange-1 text-orange-1" />
                                    </div>
                                    <div className="flex-1 h-4 bg-black-1/50 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-1 rounded-full"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <div className="w-24 flex justify-between">
                                        <span className="text-white-3 text-sm">{count} {count === 1 ? 'user' : 'users'}</span>
                                        <span className="text-white-2 text-sm font-medium">{percentage}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6">
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setUserRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(null)}
                            className="p-1 transition-transform hover:scale-110"
                            disabled={hasRated}
                        >
                            <Star
                                size={32}
                                className={`transition-colors ${(hoveredRating !== null ? star <= hoveredRating : star <= (userRating || 0))
                                    ? "fill-orange-1 text-orange-1"
                                    : "text-white-3"
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    {!hasRated ? (
                        <button
                            onClick={handleRatingSubmit}
                            disabled={!userRating}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${userRating
                                ? "bg-orange-1 text-black hover:bg-orange-2"
                                : "bg-white-1/10 text-white-3 cursor-not-allowed"
                                }`}
                        >
                            Submit Rating
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg">
                                <span>Your rating: {userRating} ★</span>
                            </div>
                            <button
                                onClick={() => setHasRated(false)}
                                className="px-4 py-2 rounded-lg font-medium bg-white-1/10 text-white-2 hover:bg-white-1/20 transition-all"
                            >
                                Modify Rating
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </DetailSection>
    );
};

export default RatingSection;