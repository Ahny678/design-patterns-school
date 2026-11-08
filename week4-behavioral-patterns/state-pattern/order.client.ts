import { PendingState } from "./concrete";
import { Order, OrderContext } from "./order.state";

// Create an order
const order: Order = {
  amount: 5000,
  count: 2,
  status: "PENDING",
  paymentConfirmed: false,
  refundIssued: false,
};

// Create the context
const context = new OrderContext(order);

// Set the initial state
context.setState(new PendingState(context));

// Process the order
console.log(context.processOrder());

// Process it again
console.log(context.processOrder());

// Process it again
console.log(context.processOrder());
