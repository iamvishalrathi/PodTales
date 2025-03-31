import React from 'react';

interface ShowMoreLessButtonsProps {
    loadMoreHandler?: () => void;
    showLessHandler?: () => void;
    hasMore?: boolean;
    canShowLess?: boolean;
}

const ShowMoreLessButtons = ({
    loadMoreHandler,
    showLessHandler,
    hasMore,
    canShowLess
}: ShowMoreLessButtonsProps) => {
    return (
        <div className="flex justify-center mt-6 sm:mt-8 gap-2 sm:gap-4">
            {hasMore && loadMoreHandler && (
                <button
                    onClick={loadMoreHandler}
                    className="bg-[#f97535] text-white py-1.5 sm:py-2.5 px-4 sm:px-7 rounded-full transition-all duration-300 flex items-center gap-1 sm:gap-2 font-medium shadow-md hover:shadow-lg hover:bg-[#f97535]/90 hover:scale-105 active:scale-95 group text-sm sm:text-base"
                >
                    Show More
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-y-1">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>
            )}

            {canShowLess && showLessHandler && (
                <button
                    onClick={showLessHandler}
                    className="bg-white-1/10 text-white py-1.5 sm:py-2.5 px-4 sm:px-7 rounded-full transition-all duration-300 flex items-center gap-1 sm:gap-2 font-medium shadow-md hover:shadow-lg hover:bg-white-1/20 hover:scale-105 active:scale-95 border border-white-1/20 group text-sm sm:text-base"
                >
                    Show Less
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-y-1">
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default ShowMoreLessButtons;