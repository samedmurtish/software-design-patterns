import { NotificationListener } from "./NotificationListener";

export class NotificationSubject {
  private listeners: NotificationListener[] = [];

  attach(listener: NotificationListener): void {
    this.listeners.push(listener);
  }

  detach(listener: NotificationListener): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notify(event: string, status: string, payload: any): void {
    this.listeners.forEach((listener) => {
      listener.update(event, status, payload);
    });
  }
}
