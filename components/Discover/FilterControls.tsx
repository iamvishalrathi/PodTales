import React from 'react';
import { Filter, Clock, TrendingUp, Heart, Star, LayoutGrid, List, Languages } from 'lucide-react';

interface FilterControlsProps {
    search: string;
    filterOption: 'latest' | 'trending' | 'popular' | 'topRated';
    setFilterOption: (option: 'latest' | 'trending' | 'popular' | 'topRated') => void;
    showCategoryFilter: boolean;
    setShowCategoryFilter: (show: boolean) => void;
    showLanguageFilter: boolean;
    setShowLanguageFilter: (show: boolean) => void;
    selectedCategories: string[];
    selectedLanguages: string[];
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
}

const FilterControls = ({
    search,
    filterOption,
    setFilterOption,
    showCategoryFilter,
    setShowCategoryFilter,
    showLanguageFilter,
    setShowLanguageFilter,
    selectedCategories,
    selectedLanguages,
    viewMode,
    setViewMode
}: FilterControlsProps) => {
    return (
        <div className="bg-gradient-to-br from-white-1/10 to-white-1/5 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white-1/10 shadow-lg">
            {/* Header section with title and view toggle */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-white-1 flex flex-wrap items-center">
                        {!search ? (
                            <>
                                <span className="sm:hidden">Browse</span>
                                <span className="hidden sm:inline">Browse Community Podcasts</span>
                            </>
                        ) : (
                            <>
                                <span className="sm:hidden">Results</span>
                                <span className="hidden sm:inline">Search results for</span>
                            </>
                        )}
                        {search && (
                            <span className="text-orange-1 ml-1 bg-orange-1/10 px-3 py-1 rounded-lg mt-1 sm:mt-0 max-w-[120px] sm:max-w-[250px] truncate">
                                {search}
                            </span>
                        )}
                    </h2>
                    <div className="flex items-center sm:hidden ml-3">
                        {/* View toggle for mobile - right aligned */}
                        <div className="bg-black/20 p-1 rounded-lg flex shadow-inner backdrop-blur-sm">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === 'grid'
                                    ? 'bg-orange-1 text-black shadow-md scale-105'
                                    : 'text-white-2 hover:bg-white-1/10'}`}
                                aria-label="Grid view"
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === 'list'
                                    ? 'bg-orange-1 text-black shadow-md scale-105'
                                    : 'text-white-2 hover:bg-white-1/10'}`}
                                aria-label="List view"
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                    {/* View toggle for desktop */}
                    <div className="bg-black/20 p-1 rounded-lg flex shadow-inner backdrop-blur-sm">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === 'grid'
                                ? 'bg-orange-1 text-black shadow-md scale-105'
                                : 'text-white-2 hover:bg-white-1/10'}`}
                            aria-label="Grid view"
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === 'list'
                                ? 'bg-orange-1 text-black shadow-md scale-105'
                                : 'text-white-2 hover:bg-white-1/10'}`}
                            aria-label="List view"
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter controls section */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                {/* Category and Language filter buttons */}
                <div className="flex justify-between sm:justify-start gap-1 sm:gap-2 sm:flex-1">
                    <button
                        onClick={() => {
                            setShowCategoryFilter(!showCategoryFilter)
                            if (showLanguageFilter) setShowLanguageFilter(false)
                        }}
                        className={`px-2 sm:px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 sm:gap-1.5 transition-all duration-200 ${showCategoryFilter || selectedCategories.length > 0
                            ? 'bg-orange-1 text-black shadow-md'
                            : 'bg-black/20 text-white-2 hover:bg-white-1/10'
                            }`}
                    >
                        <Filter size={16} />
                        <span className="sm:inline">Categories</span> {selectedCategories.length > 0 && (
                            <span className="bg-black/30 text-white px-2 py-0.5 rounded-full text-xs">
                                {selectedCategories.length}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => {
                            setShowLanguageFilter(!showLanguageFilter)
                            if (showCategoryFilter) setShowCategoryFilter(false)
                        }}
                        className={`px-2 sm:px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 sm:gap-1.5 transition-all duration-200 ${showLanguageFilter || selectedLanguages.length > 0
                            ? 'bg-orange-1 text-black shadow-md'
                            : 'bg-black/20 text-white-2 hover:bg-white-1/10'
                            }`}
                    >
                        <Languages size={16} />
                        <span className="sm:inline">Languages</span> {selectedLanguages.length > 0 && (
                            <span className="bg-black/30 text-white px-2 py-0.5 rounded-full text-xs">
                                {selectedLanguages.length}
                            </span>
                        )}
                    </button>
                </div>

                {/* Sort options */}
                <div className="bg-black/20 p-1 rounded-lg shadow-inner backdrop-blur-sm overflow-x-auto hide-scrollbar">
                    <div className="flex items-center gap-1 min-w-max">
                        <button
                            onClick={() => setFilterOption('trending')}
                            className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all duration-200 whitespace-nowrap flex-1 sm:flex-initial ${filterOption === 'trending'
                                ? 'bg-orange-1 text-black shadow-md'
                                : 'text-white-2 hover:bg-white-1/10'
                                }`}
                        >
                            <TrendingUp size={14} className="hidden sm:inline" />
                            Trending
                        </button>
                        <button
                            onClick={() => setFilterOption('latest')}
                            className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all duration-200 whitespace-nowrap flex-1 sm:flex-initial ${filterOption === 'latest'
                                ? 'bg-orange-1 text-black shadow-md'
                                : 'text-white-2 hover:bg-white-1/10'
                                }`}
                        >
                            <Clock size={14} className="hidden sm:inline" />
                            Latest
                        </button>
                        <button
                            onClick={() => setFilterOption('popular')}
                            className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all duration-200 whitespace-nowrap flex-1 sm:flex-initial ${filterOption === 'popular'
                                ? 'bg-orange-1 text-black shadow-md'
                                : 'text-white-2 hover:bg-white-1/10'
                                }`}
                        >
                            <Heart size={14} className="hidden sm:inline" />
                            Popular
                        </button>
                        <button
                            onClick={() => setFilterOption('topRated')}
                            className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all duration-200 whitespace-nowrap flex-1 sm:flex-initial ${filterOption === 'topRated'
                                ? 'bg-orange-1 text-black shadow-md'
                                : 'text-white-2 hover:bg-white-1/10'
                                }`}
                        >
                            <Star size={14} className="hidden sm:inline" />
                            Top Rated
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterControls;