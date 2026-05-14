import { INotification } from "../types/INotification";
import { LegacySmsApi } from "../external/LegacySmsApi";

export class LegacySmsAdapter implements INotification {
  private legacySmsApi: LegacySmsApi;

  constructor(legacySmsApi?: LegacySmsApi) {
    this.legacySmsApi = legacySmsApi || new LegacySmsApi();
  }

  send(to: string, message: string): void {
    this.legacySmsApi.pushMessage(to, message, false);
  }
}
