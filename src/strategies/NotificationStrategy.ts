export interface NotificationStrategy {
  process(to: string, message: string, next: () => void): void;
}
