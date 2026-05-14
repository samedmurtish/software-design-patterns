import { NotificationFactory } from "./factory/NotificationFactory";
import { LoggingDecorator } from "./decorators/LoggingDecorator";
import { NotificationSubject } from "./observer/NotificationSubject";
import { NotificationStrategy } from "./strategies/NotificationStrategy";
import { InstantDeliveryStrategy } from "./strategies/impl/InstantDeliveryStrategy";

export type NotificationPayload = {
  to: string;
  subject?: string;
  message: string;
  title?: string;
};

export class NotificationService extends NotificationSubject {
  private strategy: NotificationStrategy = new InstantDeliveryStrategy();

  setStrategy(strategy: NotificationStrategy): void {
    this.strategy = strategy;
  }

  send(
    type: string,
    payload: NotificationPayload,
    strategy?: NotificationStrategy,
  ): { success: boolean; detail: string } {
    const activeStrategy = strategy || this.strategy;

    try {
      activeStrategy.process(payload.to, payload.message, () => {
        const notification = NotificationFactory.createNotification(type);
        const decoratedNotification = new LoggingDecorator(notification);
        decoratedNotification.send(payload.to, payload.message, payload);
      });

      this.notify(type, "success", {
        to: payload.to,
        message: payload.message,
        timestamp: new Date().toISOString(),
      });

      return { success: true, detail: `${type} sent successfully` };
    } catch (error: any) {
      this.notify(type, "error", {
        to: payload.to,
        error: error.message,
        timestamp: new Date().toISOString(),
      });

      return { success: false, detail: error.message };
    }
  }
}
