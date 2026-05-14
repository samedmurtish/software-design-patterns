import { INotification } from "../types/INotification";

export class EmailNotification implements INotification {
  private emailApiKey = "EMAIL_API_KEY";

  send(to: string, message: string, options?: any): void {
    if (!to || !message) {
      throw new Error("Invalid payload");
    }

    if (!options || !options.subject) {
      throw new Error("Email requires subject");
    }

    if (this.emailApiKey.length < 10) {
      throw new Error("Invalid email API key");
    }

    console.log(
      "Sending email to",
      to,
      "subject:",
      options.subject,
      "message:",
      message,
      "using key",
      this.emailApiKey,
    );
  }
}