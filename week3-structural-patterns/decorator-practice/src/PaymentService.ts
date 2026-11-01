export interface PaymentService {
  charge(customerId: string, amount: number): Promise<string>;
  refund(paymentId: string): Promise<void>;
}

export class SimplePaymentService implements PaymentService {
  private payments = new Map<string, number>();
  private nextId = 1;

  async charge(customerId: string, amount: number): Promise<string> {
    await delay(50);
    if (amount <= 0) throw new Error("Amount must be positive");
    if (amount > 1000) throw new Error("Amount exceeds limit");
    const id = "PAY-" + this.nextId++;
    this.payments.set(id, amount);
    return id;
  }

  async refund(paymentId: string): Promise<void> {
    await delay(30);
    if (!this.payments.has(paymentId)) throw new Error("Payment not found: " + paymentId);
    this.payments.delete(paymentId);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
