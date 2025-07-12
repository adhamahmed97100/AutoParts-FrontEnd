export interface GetUserNotification {
  id: string;

  receiverType: number;

  message: string;
  title: string;

  isRead: boolean;

  createdAt: Date;

  type: string;
}
