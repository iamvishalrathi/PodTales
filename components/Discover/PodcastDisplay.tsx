import React from 'react';
import GridPodcastCard from '@/components/PodcastCard/GridPodcastCard';
import ListPodcastCard from '@/components/PodcastCard/ListPodcastCard';
import ShowMoreLessButtons from '@/components/ShowMoreLessButtons';
import PodcastCountDisplay from '@/components/PodcastCountDisplay';
import { PodcastProps } from '@/types';

interface PodcastDisplayProps {
  filteredPodcasts: PodcastProps[];
  viewMode: 'grid' | 'list';
  loadMorePodcasts?: () => void;
  showLessPodcasts?: () => void;
  hasMorePodcasts?: boolean;
  canShowLess?: boolean;
  totalPodcasts?: number;
  visibleCount?: number;
  selectedFilters?: {
    categories: string[];
    languages: string[];
  };
}

const PodcastDisplay = ({ 
  filteredPodcasts, 
  viewMode,
  loadMorePodcasts,
  showLessPodcasts,
  hasMorePodcasts,
  canShowLess,
  totalPodcasts,
  visibleCount,
}: PodcastDisplayProps) => {
  return (
    <>
      <div className={viewMode === 'grid' ? "podcast_grid" : "flex flex-col gap-4"}>
        {filteredPodcasts.map((podcast, index) => (
          <div key={podcast._id}>
            {viewMode === 'grid' ? (
              <GridPodcastCard
                imgUrl={podcast.imageUrl || ''}
                title={podcast.podcastTitle}
                description={podcast.podcastDescription}
                podcastId={podcast._id}
                views={podcast.views}
                likes={podcast.likeCount}
                rating={podcast.averageRating}
                duration={podcast.audioDuration}
                podcastType={podcast.podcastType}
                language={podcast.language}
              />
            ) : (
              <ListPodcastCard
                _id={podcast._id}
                podcastTitle={podcast.podcastTitle}
                imageUrl={podcast.imageUrl || ''}
                views={podcast.views}
                audioDuration={podcast.audioDuration || 0}
                author={podcast.author || 'Unknown Author'}
                likeCount={podcast.likeCount}
                index={index}
                podcastType={podcast.podcastType}
                language={podcast.language}
              />
            )}
          </div>
        ))}
      </div>

      {/* Show More/Less buttons */}
      <ShowMoreLessButtons
        loadMoreHandler={loadMorePodcasts}
        showLessHandler={showLessPodcasts}
        hasMore={hasMorePodcasts}
        canShowLess={canShowLess}
      />
      
      {/* Podcast count display */}
      {totalPodcasts !== undefined && visibleCount !== undefined && (
        <PodcastCountDisplay
          visibleCount={visibleCount}
          totalCount={totalPodcasts}
        />
      )}
    </>
  );
};

export default PodcastDisplay;