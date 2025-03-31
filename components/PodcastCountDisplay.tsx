import React from 'react';

interface PodcastCountDisplayProps {
  visibleCount: number;
  totalCount: number;
}

const PodcastCountDisplay = ({
  visibleCount,
  totalCount
}: PodcastCountDisplayProps) => {
  return (
    <div className="text-center text-white-2 text-sm mt-6 bg-white-1/5 py-3 px-4 rounded-lg inline-block mx-auto">
      Showing {visibleCount} of {totalCount} {totalCount === 1 ? 'podcast' : 'podcasts'}
    </div>
  );
};

export default PodcastCountDisplay;