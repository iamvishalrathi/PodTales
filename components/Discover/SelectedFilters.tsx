import React from 'react';
import { X } from 'lucide-react';
import { languageOptions, podcastTypes } from '@/constants/PodcastFields';

interface SelectedFiltersProps {
  selectedLanguages: string[];
  toggleLanguage: (language: string) => void;
  clearLanguages: () => void;
  showLanguageFilter: boolean;
  selectedCategories: string[];
  clearAllFilters: () => void;
  toggleCategory: (category: string) => void;
  clearCategories: () => void;
  showCategoryFilter: boolean;
}

const SelectedFilters = ({
  selectedLanguages,
  toggleLanguage,
  showLanguageFilter,
  selectedCategories,
  toggleCategory,
  showCategoryFilter,
  clearAllFilters
}: SelectedFiltersProps) => {
  // Only show the combined filters section if there are any filters selected and neither filter dropdown is open
  const showFilters = (selectedCategories.length > 0 || selectedLanguages.length > 0) && 
                      !showCategoryFilter && !showLanguageFilter;
  
  return (
    <>
      {showFilters && (
        <div className="hidden sm:flex flex-wrap gap-2.5 items-center bg-white-1/5 p-4 rounded-xl border border-white-1/10">
          {/* Categories section */}
          {selectedCategories.length > 0 && (
            <>
              <span className="text-white-1 text-sm font-medium bg-white-1/10 px-3 py-1 rounded-lg mr-2">Category:</span>
              {selectedCategories.map(category => {
                const categoryLabel = podcastTypes.find(c => c.value === category)?.label || category;
                return (
                  <div key={category} className="bg-orange-1/20 text-orange-1 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 shadow-sm">
                    {categoryLabel}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="hover:bg-orange-1/30 rounded-full p-0.5 transition-colors"
                      aria-label={`Remove ${categoryLabel} filter`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
              {selectedCategories.length > 0 && selectedLanguages.length > 0 && (
                <div className="mx-2 h-6 w-px bg-white-1/20"></div>
              )}
            </>
          )}

          {/* Languages section */}
          {selectedLanguages.length > 0 && (
            <>
              <span className="text-white-1 text-sm font-medium bg-white-1/10 px-3 py-1 rounded-lg mr-2">Language:</span>
              {selectedLanguages.map(lang => {
                const languageLabel = languageOptions.find(l => l.value === lang)?.label || lang;
                return (
                  <div key={lang} className="bg-orange-1/20 text-orange-1 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 shadow-sm">
                    {languageLabel}
                    <button
                      onClick={() => toggleLanguage(lang)}
                      className="hover:bg-orange-1/30 rounded-full p-0.5 transition-colors"
                      aria-label={`Remove ${languageLabel} filter`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
            </>
          )}

          {/* Clear all button */}
          <button
            onClick={clearAllFilters}
            className="text-sm text-orange-1 hover:text-orange-2 font-medium transition-colors ml-auto bg-orange-1/5 px-3 py-1 rounded-lg hover:bg-orange-1/10"
          >
            Clear all
          </button>
        </div>
      )}
    </>
  );
};

export default SelectedFilters;