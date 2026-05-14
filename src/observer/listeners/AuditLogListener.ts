import { NotificationListener } from "../NotificationListener";

export class AuditLogListener implements NotificationListener {
  update(event: string, status: string, payload: any): void {
    console.log(
      `AUDIT: Event=${event}, Status=${status}, Details=${JSON.stringify(payload)}`,
    );
  }
}
