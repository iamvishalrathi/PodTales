import React from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Notification } from "@/types/notification";

interface NotificationContentProps {
  notification: Notification;
}

const NotificationContent = ({ notification }: NotificationContentProps) => (
  <div className="flex-1">
    <div className="flex items-center gap-2 mb-1">
      {notification.creatorImageUrl && (
        <Image
          src={notification.creatorImageUrl}
          alt={notification.creatorName}
          width={24}
          height={24}
          className="rounded-full"
        />
      )}
      <span className="font-semibold text-white-1">
        {notification.creatorName}
      </span>
    </div>

    {/* Display notification message based on type */}
    <p className="text-white-2 mb-2">
      {notification?.message}
    </p>

    {notification.type === "new_podcast" && notification.podcastImageUrl && (
      <div className="mt-2">
        <Image
          src={notification.podcastImageUrl}
          alt={notification.podcastTitle || "Podcast"}
          width={80}
          height={80}
          className="rounded-md"
        />
      </div>
    )}

    <div className="flex items-center text-sm text-white-3 mt-2">
      <Calendar size={14} className="mr-1" />
      {new Date(notification._creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </div>
  </div>
);

export default NotificationContent;