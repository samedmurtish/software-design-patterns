import { INotification } from "../types/INotification";

export abstract class NotificationDecorator implements INotification {
  protected wrappedNotification: INotification;

  constructor(notification: INotification) {
    this.wrappedNotification = notification;
  }

  send(to: string, message: string, options?: any): void {
    this.wrappedNotification.send(to, message, options);
  }
}
