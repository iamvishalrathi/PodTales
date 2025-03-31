import React from "react";

// Define all possible tab types in the application
export type TabType = "all" | "unread" | "followers" | "following" | "topPodcasters";

// Define the props for the TabSelector component
interface TabSelectorProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  tabs: Array<{
    id: TabType;
    label: string;
    icon?: React.ReactNode;
    count?: number;
  }>;
}

const TabSelector = ({ activeTab, setActiveTab, tabs }: TabSelectorProps) => (
  <div className="flex bg-black-1/50 rounded-full p-1">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          tab.icon ? "flex items-center gap-2" : ""
        } ${
          activeTab === tab.id
            ? "bg-orange-1 text-white-1"
            : "text-white-2 hover:text-white-1"
        }`}
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.icon}
        {tab.label} {tab.count > 0 && `(${tab.count})`}
      </button>
    ))}
  </div>
);

export default TabSelector;