"use client";
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { api } from "@/convex/_generated/api";
import LoaderSpinner from "@/components/LoaderSpinner";
import EmptyState from "@/components/EmptyState";
import NotificationItem from "@/components/Notification/NotificationItem";
import ConfirmationModal from "@/components/Notification/ConfirmationModal";
import NotificationHeader from "@/components/Notification/NotificationHeader";
import { Notification, NotificationTab } from "@/types/notification";

// Main notification page component
const NotificationPage = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NotificationTab>("all");
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // Fetch notifications for the current user
  const notifications = useQuery(
    api.notifications.getUserNotifications,
    userId ? { userId } : "skip"
  );

  // Get the mutations for notification status
  const toggleNotificationReadStatus = useMutation(api.notifications.markNotificationAsReadUnread);
  const markAllNotificationsReadUnread = useMutation(api.notifications.markAllNotificationsAsReadUnread);
  const deleteNotification = useMutation(api.notifications.deleteNotification);
  const clearAllNotifications = useMutation(api.notifications.clearAllNotifications);

  // Filter notifications based on active tab
  const filteredNotifications = notifications?.filter((notification) => {
    if (activeTab === "all") return true;
    return !notification.isRead;
  });

  // Handle notification click - mark as read and navigate
  const handleNotificationClick = (notification: Notification) => {
    // Mark as read if not already read
    if (!notification.isRead) {
      toggleNotificationReadStatus({ notificationId: notification._id });
    }

    // Navigate based on notification type
    if (notification.type === "new_podcast" && notification.podcastId) {
      router.push(`/podcasts/${notification.podcastId}`);
    } else if (notification.type === "follow") {
      router.push(`/profile/${notification.creatorId}`);
    }
  };

  // Handle toggling notification read status
  const handleToggleReadStatus = (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation(); // Prevent the notification click event
    toggleNotificationReadStatus({ notificationId });
  };

  // Handle marking all notifications as read
  const handleMarkAllAsRead = () => {
    if (userId) {
      markAllNotificationsReadUnread({ userId, markAs: "read" });
    }
  };

  // Handle marking all notifications as unread
  const handleMarkAllAsUnread = () => {
    if (userId) {
      markAllNotificationsReadUnread({ userId, markAs: "unread" });
    }
  };

  // Handle deleting a single notification
  const handleDeleteNotification = (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation(); // Prevent the notification click event
    deleteNotification({ notificationId });
  };

  // Handle clearing all notifications
  const handleClearAllNotifications = () => {
    if (userId) {
      clearAllNotifications({ userId });
      setShowConfirmClear(false);
    }
  };

  if (!notifications) return <LoaderSpinner />;

  // Count unread and read notifications
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const readCount = notifications.filter(n => n.isRead).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <NotificationHeader
        hasNotifications={notifications.length > 0}
        unreadCount={unreadCount}
        readCount={readCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClearAll={() => setShowConfirmClear(true)}
        onMarkAllAsRead={handleMarkAllAsRead}
        onMarkAllAsUnread={handleMarkAllAsUnread}
      />

      {/* Confirmation modal for clearing all notifications */}
      {showConfirmClear && (
        <ConfirmationModal
          onCancel={() => setShowConfirmClear(false)}
          onConfirm={handleClearAllNotifications}
        />
      )}

      {filteredNotifications && filteredNotifications.length > 0 ? (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onNotificationClick={() => handleNotificationClick(notification)}
              onToggleReadStatus={(e) => handleToggleReadStatus(e, notification._id)}
              onDeleteNotification={(e) => handleDeleteNotification(e, notification._id)}
            />
          ))}
        </div>
      ) : (
        <div className="min-h-[calc(90vh-200px)] sm:min-h-[calc(90vh-150px)] flex items-center justify-center py-6 sm:py-10">
          <EmptyState
            title="No notifications yet"
            description="Join our community to connect with podcasters and get notified about new content"
            icon={<Bell size={48} className="text-orange-1" />}
            action={
              <button 
                onClick={() => router.push('/community')}
                className="mt-4 px-6 py-2 bg-orange-1 hover:bg-orange-600 text-white font-medium rounded-full transition-colors"
              >
                Explore Community
              </button>
            }
          />
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
