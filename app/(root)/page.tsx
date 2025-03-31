"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import FeaturedPodcasts from "@/components/Home/FeaturedPodcasts";
import PodcastSection from "@/components/Home/PodcastSection";
import LatestPodcasts from "@/components/Home/LatestPodcasts";
import { TrendingUp, Star } from "lucide-react";
import MobileHomeHeader from "@/components/Home/Mobile/MobileHomeHeader";
import { useRef } from "react";

const Home = () => {
  const latestPodcasts = useQuery(api.podcasts.getFilteredPodcasts, { type: 'latest', limit: 3 });
  const featuredPodcasts = useQuery(api.podcasts.getFilteredPodcasts, { type: 'popular', limit: 2 });
  const trendingPodcasts = useQuery(api.podcasts.getFilteredPodcasts, { type: 'trending', limit: 3 });
  const topRatedPodcasts = useQuery(api.podcasts.getFilteredPodcasts, { type: 'topRated', limit: 3 });

  // Create refs for each section
  const trendingRef = useRef<HTMLDivElement>(null);
  const topRatedRef = useRef<HTMLDivElement>(null);
  const latestRef = useRef<HTMLDivElement>(null);

  // Function to scroll to a specific section
  const scrollToSection = (sectionId: string) => {
    let ref;
    switch (sectionId) {
      case 'trending':
        ref = trendingRef;
        break;
      case 'topRated':
        ref = topRatedRef;
        break;
      case 'latest':
        ref = latestRef;
        break;
      default:
        ref = null;
    }

    if (ref?.current) {
      // Add offset for the sticky header
      const yOffset = -80; 
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mt-5 flex flex-col">
      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden">
        <MobileHomeHeader scrollToSection={scrollToSection} />
      </div>

      {/* Featured Podcasts */}
      <div id="featured">
        <FeaturedPodcasts featuredPodcasts={featuredPodcasts} />
      </div>

      {/* Trending */}
      <div ref={trendingRef} id="trending">
        <PodcastSection
          title="Trending Podcasts"
          icon={<TrendingUp size={28} className="text-orange-1" />}
          podcasts={trendingPodcasts}
          filterType="trending"
        />
      </div>

      {/* Top Rated */}
      <div ref={topRatedRef} id="topRated">
        <PodcastSection
          title="Top Rated Podcasts"
          icon={<Star size={28} className="text-orange-1" />}
          podcasts={topRatedPodcasts}
          filterType="topRated"
        />
      </div>

      {/* Latest */}
      <div ref={latestRef} id="latest">
        <LatestPodcasts latestPodcasts={latestPodcasts} />
      </div>
    </div>
  );
};

export default Home;
