import { NotificationStrategy } from "../NotificationStrategy";

export class InstantDeliveryStrategy implements NotificationStrategy {
  process(to: string, message: string, next: () => void): void {
    next();
  }
}
