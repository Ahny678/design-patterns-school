//Implement Strategy for two discount algorithms.
//-> First abstract strategy interface. takes in an order and returns a percentage.
//->then two contcrete implemenations of it.
//->create a context that takes in a contrete strategy. it can either set it or or call execute.
//->client will call a instatiate a concrete strategy, set it in the context and we can use the context to get discound.

interface Order {
  amount: number;
  count: number;
}

//ABSTRACT INTERFACE FOR STRATEGY
interface DiscountStrategy {
  calcDiscount(order: Order): number;
}

//CONCRETE STRETEGY IMPLEMENTATION 1

class BulkDiscount implements DiscountStrategy {
  calcDiscount(order: Order): number {
    if (order.count >= 10) return 20;
    if (order.count >= 5) return 10;
    return 0;
  }
}

//CONCRETE STRETEGY IMPLEMENTATION 2
class HighValueDiscount implements DiscountStrategy {
  calcDiscount(order: Order): number {
    if (order.amount >= 500_000) return 15;
    if (order.amount >= 100_000) return 5;
    return 0;
  }
}

//CONTEXT CLASS
class DiscountContext {
  private strategy: DiscountStrategy;

  constructor(strategy: DiscountStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: DiscountStrategy): void {
    this.strategy = strategy;
  }

  execute(order: Order): number {
    return this.strategy.calcDiscount(order);
  }
}

class placeOrder {
  placeOrder() {
    const order: Order = { amount: 50, count: 10 };
    const strategy = new BulkDiscount();
    const context = new DiscountContext(strategy);
    const discount = context.execute(order);
    console.log(discount);

    //change strategy at runtime
    context.setStrategy(new HighValueDiscount());
    const discount2 = context.execute(order);
    console.log(discount2);
  }
}

const test = new placeOrder();
test.placeOrder();
