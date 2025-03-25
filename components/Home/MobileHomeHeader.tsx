import React from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, Search } from 'lucide-react';

const MobileHomeHeader = () => {
  const { user } = useUser();
  
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
      
      {/* Quick search button */}
      <Link 
        href="/discover" 
        className="flex items-center gap-2 bg-black-1/30 border border-gray-800 rounded-xl p-3 text-white-3"
      >
        <Search size={18} />
        <span>Search for podcasts...</span>
      </Link>
      
      {/* Quick category chips */}
      <div className="flex gap-2 overflow-x-auto scroll-x-hidden py-2">
        <Link href="/discover?filter=trending" className="flex-shrink-0 bg-black-1/50 px-4 py-2 rounded-full text-sm text-white-2 border border-gray-800">
          Trending
        </Link>
        <Link href="/discover?filter=topRated" className="flex-shrink-0 bg-black-1/50 px-4 py-2 rounded-full text-sm text-white-2 border border-gray-800">
          Top Rated
        </Link>
        <Link href="/discover?filter=latest" className="flex-shrink-0 bg-black-1/50 px-4 py-2 rounded-full text-sm text-white-2 border border-gray-800">
          Latest
        </Link>
        <Link href="/discover?filter=popular" className="flex-shrink-0 bg-black-1/50 px-4 py-2 rounded-full text-sm text-white-2 border border-gray-800">
          Popular
        </Link>
      </div>
    </div>
  );
};

export default MobileHomeHeader;