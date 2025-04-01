"use client";
import { useState } from "react";
import { useQuery } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { TrendingUp, User, UserCheck } from "lucide-react";

import { api } from "@/convex/_generated/api";
import LoaderSpinner from "@/components/LoaderSpinner";
import TabSelector, { TabType } from "@/components/ui/TabSelector";
import SearchBar from "@/components/Community/SearchBar";
import UsersList from "@/components/Community/UsersList";

type CommunityTab = "followers" | "following" | "topPodcasters";

const Community = () => {
  const { userId } = useAuth();
  const [activeTab, setActiveTab] = useState<CommunityTab>("topPodcasters");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch followers and following
  const followers = useQuery(api.follows.getFollowers, userId ? { userId } : "skip");
  const following = useQuery(api.follows.getFollowing, userId ? { userId } : "skip");
  
  // Fetch top users
  const topUsers = useQuery(api.users.getTopUsers);

  // Filter based on search query
  const getFilteredUsers = () => {
    if (activeTab === "followers") {
      return followers?.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } else if (activeTab === "following") {
      return following?.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
      return topUsers?.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  };

  const filteredUsers = getFilteredUsers();

  if ((activeTab === "followers" && followers === undefined) || 
      (activeTab === "following" && following === undefined) ||
      (activeTab === "topPodcasters" && topUsers === undefined)) {
    return <LoaderSpinner />;
  }

  // Handle tab change with type safety
  const handleTabChange = (tab: TabType) => {
    if (tab === "followers" || tab === "following" || tab === "topPodcasters") {
      setActiveTab(tab);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white-1">Community</h1>
        <TabSelector 
          activeTab={activeTab} 
          setActiveTab={handleTabChange}
          tabs={[
            { 
              id: "topPodcasters", 
              label: "Top Podcasters", 
              icon: <TrendingUp size={16} className="hidden sm:inline" /> 
            },
            { 
              id: "followers", 
              label: "Followers", 
              icon: <User size={16} className="hidden sm:inline" />, 
              count: followers?.length 
            },
            { 
              id: "following", 
              label: "Following", 
              icon: <UserCheck size={16} className="hidden sm:inline" />, 
              count: following?.length 
            }
          ]}
        />
      </div>

      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        activeTab={activeTab} 
      />

      <UsersList 
        users={filteredUsers} 
        activeTab={activeTab} 
        searchQuery={searchQuery} 
      />
    </div>
  );
};

export default Community;
