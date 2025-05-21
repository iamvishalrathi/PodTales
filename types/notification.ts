export type NotificationType = "new_podcast" | "admin_approved" | "admin_rejected" | "report_status";
export type NotificationTab = "all" | "unread";

export interface Notification {
  _id: string;
  _creationTime: number;
  type: NotificationType;
  isRead: boolean;
  creatorName: string;
  creatorId: string;
  creatorImageUrl?: string;
  podcastId?: string;
  podcastTitle?: string;
  podcastImageUrl?: string;
  message?: string;
}