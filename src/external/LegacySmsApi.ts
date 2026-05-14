export class LegacySmsApi {
  pushMessage(phone: string, text: string, isFlash: boolean): void {
    console.log("Legacy SMS sent to", phone, "text:", text, "flash:", isFlash);
  }
}