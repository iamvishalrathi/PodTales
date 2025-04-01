import React from "react";
import { Notification } from "@/types/notification";
import NotificationActions from "./NotificationActions";
import NotificationIcon from "./NotificationIcon";
import NotificationContent from "./NotificationContent";

interface NotificationItemProps {
  notification: Notification;
  onNotificationClick: () => void;
  onToggleReadStatus: (e: React.MouseEvent) => void;
  onDeleteNotification: (e: React.MouseEvent) => void;
}

const NotificationItem = ({
  notification,
  onNotificationClick,
  onToggleReadStatus,
  onDeleteNotification,
}: NotificationItemProps) => (
  <div
    className={`bg-black-1/30 border ${
      notification.isRead ? "border-gray-800" : "border-orange-1/50"
    } rounded-xl p-3 sm:p-4 transition-all hover:bg-black-1/50 cursor-pointer relative`}
    onClick={onNotificationClick}
  >
    <NotificationActions
      notification={notification}
      onToggleRead={onToggleReadStatus}
      onDelete={onDeleteNotification}
    />
    <div className="flex items-start gap-2 sm:gap-4 pt-6 sm:pt-0">
      <NotificationIcon type={notification.type} />
      <NotificationContent notification={notification} />
    </div>
  </div>
);

export default NotificationItem;