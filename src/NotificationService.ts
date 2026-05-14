export type NotificationPayload = {
  to: string;
  subject?: string;
  message: string;
  title?: string;
};

export class NotificationService {
  private emailApiKey = "EMAIL_API_KEY";
  private smsApiKey = "SMS_API_KEY";
  private pushApiKey = "PUSH_API_KEY";

  send(
    type: "email" | "sms" | "push",
    payload: NotificationPayload,
  ): { success: boolean; detail: string } {
    if (!payload || !payload.to || !payload.message) {
      return { success: false, detail: "Invalid payload" };
    }

    if (type === "email") {
      if (!payload.subject) {
        return { success: false, detail: "Email requires subject" };
      }
      if (this.emailApiKey.length < 10) {
        return { success: false, detail: "Invalid email API key" };
      }
      console.log(
        "Sending email to",
        payload.to,
        "subject:",
        payload.subject,
        "message:",
        payload.message,
        "using key",
        this.emailApiKey,
      );
      return { success: true, detail: "Email sent" };
    } else if (type === "sms") {
      if (payload.to.length < 5) {
        return { success: false, detail: "Invalid phone number" };
      }
      if (this.smsApiKey.indexOf("SMS") === -1) {
        return { success: false, detail: "Invalid SMS API key" };
      }
      console.log(
        "Sending SMS to",
        payload.to,
        "message:",
        payload.message,
        "using key",
        this.smsApiKey,
      );
      return { success: true, detail: "SMS sent" };
    } else if (type === "push") {
      if (!payload.title) {
        return { success: false, detail: "Push requires title" };
      }
      if (!this.pushApiKey) {
        return { success: false, detail: "Missing push API key" };
      }
      console.log(
        "Sending push to",
        payload.to,
        "title:",
        payload.title,
        "message:",
        payload.message,
        "using key",
        this.pushApiKey,
      );
      return { success: true, detail: "Push sent" };
    }

    return { success: false, detail: "Unknown notification type" };
  }
}
