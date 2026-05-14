import { INotification } from "../types/INotification";

export class PushNotification implements INotification {
  private pushApiKey = "PUSH_API_KEY";

  send(to: string, message: string, options?: any): void {
    if (!to || !message) {
      throw new Error("Invalid payload");
    }

    if (!options || !options.title) {
      throw new Error("Push requires title");
    }

    if (!this.pushApiKey) {
      throw new Error("Missing push API key");
    }

    console.log(
      "Sending push to",
      to,
      "title:",
      options.title,
      "message:",
      message,
      "using key",
      this.pushApiKey,
    );
  }
}