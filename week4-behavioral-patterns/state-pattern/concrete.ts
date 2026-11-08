import { OrderContext, State, Order } from "./order.state";

export class PendingState implements State {
  constructor(private context: OrderContext) {}

  processOrder(): Order {
    const order = this.context.order;

    order.paymentConfirmed = true;
    order.status = "PAID";

    this.context.setState(new PaidState(this.context));

    return order;
  }

  cancelOrder(): Order {
    const order = this.context.order;

    order.status = "CANCELLED";
    this.context.setState(new CancelledState(this.context));

    return order;
  }
}

class PaidState implements State {
  constructor(private context: OrderContext) {}

  processOrder(): Order {
    const order = this.context.order;

    order.status = "PROCESSING";
    this.context.setState(new ProcessingState(this.context));

    return order;
  }

  cancelOrder(): Order {
    const order = this.context.order;

    order.refundIssued = true;
    order.status = "REFUNDED";

    this.context.setState(new RefundedState(this.context));

    return order;
  }
}

class ProcessingState implements State {
  constructor(private context: OrderContext) {}

  processOrder(): Order {
    const order = this.context.order;

    order.status = "SHIPPED";
    this.context.setState(new ShippedState(this.context));

    return order;
  }

  cancelOrder(): Order {
    const order = this.context.order;

    order.status = "CANCELLED";
    this.context.setState(new CancelledState(this.context));

    return order;
  }
}

class ShippedState implements State {
  constructor(private context: OrderContext) {}

  processOrder(): Order {
    const order = this.context.order;

    order.status = "DELIVERED";
    this.context.setState(new DeliveredState(this.context));

    return order;
  }

  cancelOrder(): Order {
    throw new Error("Cannot cancel an order that has been shipped.");
  }
}

class DeliveredState implements State {
  constructor(private context: OrderContext) {}

  processOrder(): Order {
    throw new Error("Order has already been delivered.");
  }

  cancelOrder(): Order {
    throw new Error("Cannot cancel a delivered order.");
  }
}

class CancelledState implements State {
  constructor(private context: OrderContext) {}

  processOrder(): Order {
    throw new Error("Cannot process a cancelled order.");
  }

  cancelOrder(): Order {
    throw new Error("Order is already cancelled.");
  }
}

class RefundedState implements State {
  constructor(private context: OrderContext) {}

  processOrder(): Order {
    throw new Error("Cannot process a refunded order.");
  }

  cancelOrder(): Order {
    throw new Error("Order has already been refunded.");
  }
}
