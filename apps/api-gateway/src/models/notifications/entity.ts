/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/indent */

export enum NotificationType {
  EmailNotifications = 'email_notifications',
  SmsNotifications = 'sms_notifications',
}

export default class NotificationDataEventType {
  id: NotificationType;

  enabled: boolean;

  user: string;
}
