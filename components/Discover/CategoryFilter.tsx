import React from 'react';
import { Filter } from 'lucide-react';
import { podcastTypes } from '@/constants/PodcastFields';

interface CategoryFilterProps {
    showCategoryFilter: boolean;
    setShowCategoryFilter: (show: boolean) => void;
    selectedCategories: string[];
    toggleCategory: (category: string) => void;
    clearCategories: () => void;
}

const CategoryFilter = ({
    showCategoryFilter,
    setShowCategoryFilter,
    selectedCategories,
    toggleCategory,
    clearCategories
}: CategoryFilterProps) => {
    if (!showCategoryFilter) return null;

    return (
        <div className="bg-gradient-to-br from-white-1/10 to-white-1/5 backdrop-blur-sm p-6 rounded-xl border border-white-1/10 shadow-lg animate-fadeIn">
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-white-1 font-semibold flex items-center gap-2 text-lg">
                    <Filter size={18} className="text-orange-1" />
                    <>
                        <span className="sm:hidden">Category</span>
                        <span className="hidden sm:inline">Filter by Category</span>
                    </>
                </h3>
                <div className="flex gap-3">
                    {selectedCategories.length > 0 && (
                        <button
                            onClick={clearCategories}
                            className="text-sm bg-black/20 hover:bg-white-1/10 px-3 py-1.5 rounded-lg text-white-2 transition-colors"
                        >
                            Clear all 
                        </button>
                    )}
                    <button
                        onClick={() => setShowCategoryFilter(false)}
                        className="text-sm bg-black/20 hover:bg-white-1/10 px-3 py-1.5 rounded-lg text-white-2 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
            <div className="flex pl-1 flex-wrap gap-3 max-h-[200px] overflow-y-auto pr-2 pb-2 custom-scrollbar">
                {podcastTypes.map((category) => (
                    <button
                        key={category.value}
                        onClick={() => toggleCategory(category.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategories.includes(category.value)
                            ? 'bg-orange-1 text-black shadow-md scale-105'
                            : 'bg-black/20 text-white-2 hover:bg-white-1/10 hover:scale-105'
                            }`}
                    >
                        {category.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;