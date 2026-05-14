import { INotification } from "../types/INotification";

export class SmsNotification implements INotification {
  private smsApiKey = "SMS_API_KEY";

  send(to: string, message: string, options?: any): void {
    if (!to || !message) {
      throw new Error("Invalid payload");
    }

    if (to.length < 5) {
      throw new Error("Invalid phone number");
    }

    if (this.smsApiKey.indexOf("SMS") === -1) {
      throw new Error("Invalid SMS API key");
    }

    console.log(
      "Sending SMS to",
      to,
      "message:",
      message,
      "using key",
      this.smsApiKey,
    );
  }
}