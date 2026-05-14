import { NotificationListener } from "../NotificationListener";

export class AnalyticsListener implements NotificationListener {
  update(event: string, status: string, payload: any): void {
    console.log(
      `ANALYTICS: Event=${event}, Status=${status}, Recipient=${payload.to}`,
    );
  }
}
