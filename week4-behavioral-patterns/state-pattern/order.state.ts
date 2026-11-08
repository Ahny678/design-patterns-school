//Implement State or explicit state-transition logic for order statuses.

import { PendingState } from "./concrete";

//define abstract state interface
//write concrete implementations for each state
//create a context that sets the state and calls the state functions
//have the client call ther context. should only communicate with OrderContex

type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export interface Order {
  amount: number;
  count: number;
  status: OrderStatus;
  paymentConfirmed: boolean;
  refundIssued: boolean;
}

export interface State {
  processOrder(): Order;
  cancelOrder(): Order;
}

//CONTEXT
export class OrderContext {
  public order: Order;
  private state!: State; //definite assignment assertion. so no error even if we arent inti state yet

  constructor(order: Order) {
    this.order = order;
  }

  setState(state: State): void {
    this.state = state;
  }

  processOrder(): Order {
    return this.state.processOrder();
  }

  cancelOrder(): Order {
    return this.state.cancelOrder();
  }
}
