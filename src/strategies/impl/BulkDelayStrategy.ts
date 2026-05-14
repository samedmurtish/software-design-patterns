import { NotificationStrategy } from "../NotificationStrategy";

export class BulkDelayStrategy implements NotificationStrategy {
  async process(to: string, message: string, next: () => void): Promise<void> {
    console.log("QUEUE: Adding to bulk delivery queue...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    next();
  }
}
