import PodcastCard from '@/components/PodcastCard/GridPodcastCard';
import EmptyState from '@/components/EmptyState';
import ShowMoreLessButtons from '@/components/ShowMoreLessButtons';
import PodcastCountDisplay from '@/components/PodcastCountDisplay';
import { useState, useRef } from 'react';
import { Id } from '@/convex/_generated/dataModel';

// Update the interface to match the actual podcast data structure
interface SimilarPodcastsProps {
  similarPodcasts: Array<{
    _id: Id<"podcasts">;
    podcastTitle: string;
    podcastDescription: string;
    imageUrl?: string | null;
    _creationTime?: number;
    audioUrl?: string;
    audioStorageId?: Id<"_storage">;
    imageStorageId?: Id<"_storage">;
    views?: number;
    author?: string;
    authorId?: string;
    authorImageUrl?: string;
    podcastType?: string;
    voiceType?: string;
    voicePrompt?: string;
    imagePrompt?: string;
    audioDuration?: number;
    likes?: string[];
    ratingCount?: number;
    averageRating?: number;
  }> | undefined;
}

const SimilarPodcasts = ({ similarPodcasts }: SimilarPodcastsProps) => {
  const [visibleCount, setVisibleCount] = useState(3); // Initially show 3 podcasts
  const initialPodcastCount = 3; // Define a constant for the initial count
  const sectionRef = useRef<HTMLElement>(null);

  // Load more podcasts
  const loadMorePodcasts = () => {
    setVisibleCount(prev => prev + 3);
  };

  // Show less podcasts and scroll to top of section
  const showLessPodcasts = () => {
    setVisibleCount(initialPodcastCount);
    // Scroll to the top of the section
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine if we can show more or less
  const hasMorePodcasts = similarPodcasts ? similarPodcasts.length > visibleCount : false;
  const canShowLess = visibleCount > initialPodcastCount;

  // Get the podcasts to display
  const podcastsToDisplay = similarPodcasts ? similarPodcasts.slice(0, visibleCount) : [];
  const totalPodcasts = similarPodcasts ? similarPodcasts.length : 0;

  return (
    <section ref={sectionRef} className="mt-12 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-6 w-1.5 bg-gradient-to-t from-orange-1 to-orange-400 rounded-full" />
        <h2 className="text-24 font-bold text-white-1">Similar Podcasts</h2>
      </div>

      {similarPodcasts && similarPodcasts.length > 0 ? (
        <>
          <div className="podcast_grid">
            {podcastsToDisplay.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
              <div key={_id} className="transform transition-all duration-300 hover:-translate-y-2">
                <PodcastCard
                  imgUrl={imageUrl as string}
                  title={podcastTitle}
                  description={podcastDescription}
                  podcastId={_id}
                />
              </div>
            ))}
          </div>

          {/* Show More/Less buttons */}
          {totalPodcasts > initialPodcastCount && (
            <ShowMoreLessButtons
              loadMoreHandler={loadMorePodcasts}
              showLessHandler={showLessPodcasts}
              hasMore={hasMorePodcasts}
              canShowLess={canShowLess}
            />
          )}

          {/* Podcast count display */}
          <div className="flex justify-center mt-4">
            <PodcastCountDisplay
              visibleCount={Math.min(visibleCount, totalPodcasts)}
              totalCount={totalPodcasts}
            />
          </div>
        </>
      ) : (
        <div className="bg-black-1/30 p-8 rounded-xl border border-gray-800">
          <EmptyState
            title="No similar podcasts found"
            buttonLink="/discover"
            buttonText="Discover more podcasts"
          />
        </div>
      )}
    </section>
  );
};

export default SimilarPodcasts;