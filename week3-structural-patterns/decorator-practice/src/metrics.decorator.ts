import { PaymentService } from "./PaymentService";

export class MetricsPaymentService implements PaymentService {
  constructor(protected wrappee: PaymentService) {}

  private metrics = {
    charge: {
      calls: 0,
      failures: 0,
      totalDuration: 0,
    },
    refund: {
      calls: 0,
      failures: 0,
      totalDuration: 0,
    },
  };

  private getAverageDuration(method: "charge" | "refund"): number {
    const metric = this.metrics[method];

    return metric.calls === 0
      ? 0
      : metric.totalDuration / metric.calls;
  }

  printMetrics(): void {
    for (const method of ["charge", "refund"] as const) {
      const metric = this.metrics[method];

      console.log(`${method}:`);
      console.log(`Calls: ${metric.calls}`);
      console.log(`Failures: ${metric.failures}`);
      console.log(
        `Average Duration: ${this.getAverageDuration(method).toFixed(2)} ms`
      );
    }
  }

  async charge(customerId: string, amount: number): Promise<string> {
    const start = performance.now();

    this.metrics.charge.calls++;

    try {
      return await this.wrappee.charge(customerId, amount);
    } catch (error) {
      this.metrics.charge.failures++;
      throw error;
    } finally {
      this.metrics.charge.totalDuration += performance.now() - start;
    }
  }

  async refund(paymentId: string): Promise<void> {
    const start = performance.now();

    this.metrics.refund.calls++;

    try {
      await this.wrappee.refund(paymentId);
    } catch (error) {
      this.metrics.refund.failures++;
      throw error;
    } finally {
      this.metrics.refund.totalDuration += performance.now() - start;
    }
  }
}

 