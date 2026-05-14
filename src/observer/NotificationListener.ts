export interface NotificationListener {
  update(event: string, status: string, payload: any): void;
}
