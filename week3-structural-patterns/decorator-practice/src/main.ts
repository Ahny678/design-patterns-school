import { LoggingPaymentService } from "./logging.decorator";
import { MetricsPaymentService } from "./metrics.decorator";
import { PaymentService, SimplePaymentService } from "./PaymentService";

async function run(service: PaymentService) {
  const id = await service.charge("cust-1", 250);
  console.log("Charged:", id);

  await service.refund(id);
  console.log("Refunded:", id);

  try {
    await service.charge("cust-2", 5000);
  } catch (e: any) {
    console.log("Failed:", e.message);
  }
}

// wrap the service with your decorators 
const realService = new SimplePaymentService();

const metricsService = new MetricsPaymentService(realService);

const loggingService = new LoggingPaymentService(metricsService);



const service: PaymentService = loggingService;

async function main() {
  await run(service);
  metricsService.printMetrics();
}

main();

 
