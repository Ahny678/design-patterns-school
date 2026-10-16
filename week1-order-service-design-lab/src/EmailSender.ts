export class EmailSender {
  static sent: string[] = [];

  send(to: string, message: string): void {
    EmailSender.sent.push(to + ": " + message);
    console.log("[EMAIL to " + to + "] " + message);
  }
}
