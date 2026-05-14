import { INotification } from "../types/INotification";
import { EmailNotification } from "../services/EmailNotification";
import { SmsNotification } from "../services/SmsNotification";
import { PushNotification } from "../services/PushNotification";
import { LegacySmsAdapter } from "../adapters/LegacySmsAdapter";

export class NotificationFactory {
  static createNotification(type: string): INotification {
    const normalizedType = type.toLowerCase();

    if (normalizedType === "email") {
      return new EmailNotification();
    }

    if (normalizedType === "sms") {
      return new SmsNotification();
    }

    if (normalizedType === "push") {
      return new PushNotification();
    }

    if (normalizedType === "legacy-sms") {
      return new LegacySmsAdapter();
    }

    throw new Error("Unknown notification type");
  }
}
