import React from 'react';
import { Globe } from 'lucide-react';
import { languageOptions } from '@/constants/PodcastFields';

interface LanguageFilterProps {
    showLanguageFilter: boolean;
    setShowLanguageFilter: (show: boolean) => void;
    selectedLanguages: string[];
    toggleLanguage: (language: string) => void;
    clearLanguages: () => void;
}

const LanguageFilter = ({
    showLanguageFilter,
    setShowLanguageFilter,
    selectedLanguages,
    toggleLanguage,
    clearLanguages
}: LanguageFilterProps) => {
    if (!showLanguageFilter) return null;

    // Sort languages alphabetically by label
    const sortedLanguages = [...languageOptions].sort((a, b) =>
        a.label.localeCompare(b.label)
    );

    // Group by first letter
    const groups = sortedLanguages.reduce((acc, lang) => {
        const firstLetter = lang.label[0].toUpperCase();
        if (!acc[firstLetter]) acc[firstLetter] = [];
        acc[firstLetter].push(lang);
        return acc;
    }, {} as Record<string, typeof languageOptions>);

    // Get sorted letters
    const letters = Object.keys(groups).sort();

    return (
        <div className="bg-gradient-to-br from-white-1/10 to-white-1/5 backdrop-blur-sm p-6 rounded-xl border border-white-1/10 shadow-lg animate-fadeIn">
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-white-1 font-semibold flex items-center gap-2 text-lg">
                    <Globe size={18} className="text-orange-1" />
                    <>
                        <span className="sm:hidden">Language</span>
                        <span className="hidden sm:inline">Filter by Language</span>
                    </>
                </h3>
                <div className="flex gap-3">
                    {selectedLanguages.length > 0 && (
                        <button
                            onClick={clearLanguages}
                            className="text-sm bg-black/20 hover:bg-white-1/10 px-3 py-1.5 rounded-lg text-white-2 transition-colors"
                        >
                            Clear all
                        </button>
                    )}
                    <button
                        onClick={() => setShowLanguageFilter(false)}
                        className="text-sm bg-black/20 hover:bg-white-1/10 px-3 py-1.5 rounded-lg text-white-2 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Alphabetical language groups with reduced height */}
            <div className="max-h-[140px] overflow-y-auto pr-2 pb-2 custom-scrollbar">
                {letters.map(letter => (
                    <div key={letter} className="mb-3">
                        <div className="text-orange-1 font-bold text-sm mb-1.5 border-b border-white-1/10 pb-0.5">
                            {letter}
                        </div>
                        <div className="flex flex-wrap gap-2 pl-1.5">
                            {groups[letter].map((language) => (
                                <button
                                    key={language.value}
                                    onClick={() => toggleLanguage(language.value)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${selectedLanguages.includes(language.value)
                                        ? 'bg-orange-1 text-black shadow-md scale-105'
                                        : 'bg-black/20 text-white-2 hover:bg-white-1/10 hover:scale-105'
                                        }`}
                                >
                                    {language.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageFilter;