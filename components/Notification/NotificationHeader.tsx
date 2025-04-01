import React from "react";
import { Bell, Check, RefreshCw, Trash2 } from "lucide-react";
import TabSelector, { TabType } from "@/components/ui/TabSelector";
import { cn } from "@/lib/utils";

interface NotificationHeaderProps {
    hasNotifications: boolean;
    unreadCount: number;
    readCount: number;
    activeTab: "all" | "unread";
    setActiveTab: (tab: TabType) => void;
    onClearAll: () => void;
    onMarkAllAsRead: () => void;
    onMarkAllAsUnread: () => void;
}

const NotificationHeader = ({
    hasNotifications,
    unreadCount,
    readCount,
    activeTab,
    setActiveTab,
    onClearAll,
    onMarkAllAsRead,
    onMarkAllAsUnread,
}: NotificationHeaderProps) => (
    <div className="flex items-center justify-between gap-2 mb-4 sm:mb-8">
        <div className="flex items-center gap-2">
            <div 
                className="relative cursor-pointer" 
                onClick={() => setActiveTab("unread" as TabType)}
            >
                <Bell size={24} className="text-orange-1 sm:hidden" />
                {unreadCount > 0 && (
                    <span className="sm:hidden absolute -top-1 -right-1 h-2 w-2 rounded-full bg-orange-1"></span>
                )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white-1">
                <span className="hidden sm:inline">Notifications</span>
            </h1>
        </div>

        <div className="flex items-center gap-1 sm:gap-4">
            {hasNotifications && (
                <button
                    onClick={onClearAll}
                    className={cn(
                        "hidden sm:flex items-center justify-center",
                        "text-white-2 hover:text-red-500 transition-colors",
                        "sm:w-auto sm:h-auto sm:rounded-none",
                        "sm:hover:bg-transparent"
                    )}
                >
                    <Trash2 size={16} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline sm:ml-1">Clear all</span>
                </button>
            )}
            {unreadCount > 0 && (
                <button
                    onClick={onMarkAllAsRead}
                    className={cn(
                        "hidden sm:flex items-center justify-center",
                        "text-white-2 hover:text-orange-1 transition-colors",
                        "sm:w-auto sm:h-auto sm:rounded-none",
                        "sm:hover:bg-transparent"
                    )}
                >
                    <Check size={16} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline sm:ml-1">Mark all as read</span>
                </button>
            )}
            {readCount > 0 && (
                <button
                    onClick={onMarkAllAsUnread}
                    className={cn(
                        "hidden sm:flex items-center justify-center",
                        "text-white-2 hover:text-orange-1 transition-colors",
                        "sm:w-auto sm:h-auto sm:rounded-none",
                        "sm:hover:bg-transparent"
                    )}
                >
                    <RefreshCw size={16} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline sm:ml-1">Mark all as unread</span>
                </button>
            )}
            <TabSelector
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={[
                    { id: "all", label: "All" },
                    { id: "unread", label: "Unread", count: unreadCount }
                ]}
            />
        </div>
    </div>
);

export default NotificationHeader;