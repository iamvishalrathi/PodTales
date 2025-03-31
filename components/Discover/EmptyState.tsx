import React from 'react';
import { RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  search: string;
  selectedCategories: string[];
  selectedLanguages: string[];
  clearAllFilters: () => void;
}

const EmptyState = ({ search, selectedCategories, selectedLanguages, clearAllFilters }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white-1/5 rounded-xl border border-white-1/10">
      <div className="bg-white-1/10 p-6 rounded-full mb-5 shadow-inner">
        <RefreshCw size={32} className="text-orange-1" />
      </div>
      <h3 className="text-2xl font-bold text-white-1 mb-3">No podcasts found</h3>
      <p className="text-white-2 text-center max-w-md mb-8 px-4">
        {search
          ? `We couldn't find any podcasts matching "${search.length > 20 ? search.substring(0, 20) + '...' : search}". Try a different search term.`
          : selectedCategories.length > 0 || selectedLanguages.length > 0
            ? "No podcasts match your selected filters. Try different options or clear filters."
            : "We couldn't find any podcasts. Try a different filter or check back later."}
      </p>
      <button
        onClick={() => {
          clearAllFilters();
          if (search) window.location.href = '/discover';
        }}
        className="bg-orange-1 text-black px-8 py-3 rounded-full font-semibold hover:bg-orange-2 transition-colors shadow-lg"
      >
        {selectedCategories.length > 0 || selectedLanguages.length > 0 ? "Clear Filters" : "Clear Search"}
      </button>
    </div>
  );
};

export default EmptyState;