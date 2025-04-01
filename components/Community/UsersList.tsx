import React from "react";
import UserCard from "./UserCard";
import EmptyState from "@/components/EmptyState";
import { TrendingUp, User, UserCheck } from "lucide-react";

interface UsersListProps {
  users: any[] | undefined;
  activeTab: "followers" | "following" | "topPodcasters";
  searchQuery: string;
}

const UsersList = ({ users, activeTab, searchQuery }: UsersListProps) => {
  if (!users || users.length === 0) {
    return (
      <div className="min-h-[calc(70vh-200px)] sm:min-h-[calc(85vh-200px)] flex items-center justify-center py-6 sm:py-10">
        <EmptyState
          title={
            activeTab === "topPodcasters"
              ? "No top podcasters found"
              : `No ${activeTab} found`
          }
          description={
            searchQuery
              ? `No results found for "${searchQuery}"`
              : activeTab === "followers"
                ? "You don't have any followers yet"
                : activeTab === "following"
                  ? "You're not following anyone yet"
                  : "No top podcasters available at the moment"
          }
          icon={
            activeTab === "followers" ? (
              <User size={48} className="text-orange-1" />
            ) : activeTab === "following" ? (
              <UserCheck size={48} className="text-orange-1" />
            ) : (
              <TrendingUp size={48} className="text-orange-1" />
            )
          }
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {users.map((user) => (
        <UserCard
          key={user.clerkId}
          user={user}
          activeTab={activeTab}
        />
      ))}
    </div>
  );
};

export default UsersList;