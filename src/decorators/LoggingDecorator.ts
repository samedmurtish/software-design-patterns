import { NotificationDecorator } from "./NotificationDecorator";

export class LoggingDecorator extends NotificationDecorator {
  send(to: string, message: string, options?: any): void {
    console.log("LOG: Initiating notification delivery...");
    super.send(to, message, options);
    console.log("LOG: Notification delivery finished.");
  }
}
