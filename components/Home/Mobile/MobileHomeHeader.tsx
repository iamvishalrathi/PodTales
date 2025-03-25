import React from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Bell, Search } from 'lucide-react';

interface MobileHomeHeaderProps {
    scrollToSection?: (sectionId: string) => void;
}

const MobileHomeHeader = ({ scrollToSection }: MobileHomeHeaderProps) => {
    const { user } = useUser();

    const handleCategoryClick = (sectionId: string, e: React.MouseEvent) => {
        e.preventDefault();
        if (scrollToSection) {
            scrollToSection(sectionId);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Welcome message */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white-1">
                        Welcome{user?.firstName ? `, ${user.firstName}` : ''}
                    </h1>
                    <p className="text-white-3 text-sm mt-1">Discover amazing podcasts today</p>
                </div>

                {/* Notification icon */}
                <Link href="/notification" className="relative p-2">
                    <Bell size={24} className="text-white-2" />
                    {/* Notification dot - you can conditionally render this based on unread notifications */}
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-1"></span>
                </Link>
            </div>

            {/* Quick category chips */}
            <div className="flex gap-2 overflow-x-auto scroll-x-hidden py-2">
                <button 
                    onClick={(e) => handleCategoryClick('featured', e)}
                    className="flex-shrink-0 bg-black-1/50 px-4 py-2 rounded-full text-sm text-white-2 border border-gray-800"
                >
                    Featured
                </button>
                <button 
                    onClick={(e) => handleCategoryClick('trending', e)}
                    className="flex-shrink-0 bg-black-1/50 px-4 py-2 rounded-full text-sm text-white-2 border border-gray-800"
                >
                    Trending
                </button>
                <button 
                    onClick={(e) => handleCategoryClick('topRated', e)}
                    className="flex-shrink-0 bg-black-1/50 px-4 py-2 rounded-full text-sm text-white-2 border border-gray-800"
                >
                    Top Rated
                </button>
                <button 
                    onClick={(e) => handleCategoryClick('latest', e)}
                    className="flex-shrink-0 bg-black-1/50 px-4 py-2 rounded-full text-sm text-white-2 border border-gray-800"
                >
                    Latest
                </button>
            </div>
        </div>
    );
};

export default MobileHomeHeader;