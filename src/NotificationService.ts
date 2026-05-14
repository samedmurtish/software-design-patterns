import { NotificationFactory } from "./factory/NotificationFactory";

export type NotificationPayload = {
  to: string;
  subject?: string;
  message: string;
  title?: string;
};

export class NotificationService {
  send(type: string, payload: NotificationPayload): { success: boolean; detail: string } {
    try {
      const notification = NotificationFactory.createNotification(type);
      notification.send(payload.to, payload.message, payload);

      return { success: true, detail: `${type} sent successfully` };
    } catch (error: any) {
      return { success: false, detail: error.message };
    }
  }
}
