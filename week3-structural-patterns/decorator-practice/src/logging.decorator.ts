import { PaymentService } from "./PaymentService";

export class LoggingPaymentService implements PaymentService {
  constructor(protected wrappee: PaymentService) {}

  async charge(customerId: string, amount: number): Promise<string> {
    console.log("Calling charge:", customerId, amount);

    try {
      const result = await this.wrappee.charge(customerId, amount);

      console.log("Charge result:", result);

      return result;
    } catch (error) {
      console.log("Charge error:", error);
      throw error;
    }
  }

  async refund(paymentId: string): Promise<void> {
    console.log("Calling refund:", paymentId);

    try {
      await this.wrappee.refund(paymentId);

      console.log("Refund successful");
    } catch (error) {
      console.log("Refund error:", error);
      throw error;
    }
  }
}