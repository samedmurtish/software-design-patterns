export interface INotification {
  send(to: string, message: string, options?: any): void;
}