import { EmailSender } from "./EmailSender";

export class OrderService {
  products: any = {
    LAPTOP: { price: 800, stock: 5 },
    MOUSE: { price: 20, stock: 50 },
    BAG: { price: 60, stock: 10 },
  };
  orders: any[] = [];
  email = new EmailSender();

  placeOrder(customer: string, emailAddr: string, items: any[], paymentType: string, shippingType: string): any {
    // validate
    if (!customer || !emailAddr.includes("@") || items.length === 0) {
      console.log("Invalid order");
      return null;
    }
    let total = 0;
    for (const item of items) {
      const p = this.products[item.name];
      if (!p || item.qty <= 0 || p.stock < item.qty) {
        console.log("Invalid item: " + item.name);
        return null;
      }
      total += p.price * item.qty;
    }

    // shipping
    let shipping = 0;
    if (shippingType === "STANDARD") {
      shipping = total > 100 ? 0 : 5;
    } else if (shippingType === "EXPRESS") {
      shipping = 15;
    } else if (shippingType === "PICKUP") {
      shipping = 0;
    } else {
      console.log("Unknown shipping type");
      return null;
    }
    total = total + shipping;

    const order: any = { id: this.orders.length + 1, customer, emailAddr, items, total, status: "NEW" };
    this.orders.push(order);
    this.email.send(emailAddr, "Order #" + order.id + " received. Total: $" + total);

    // payment
    if (paymentType === "CARD") {
      if (total > 1000) {
        order.status = "PAYMENT_FAILED";
        this.email.send(emailAddr, "Card payment failed for order #" + order.id);
        return order;
      }
      console.log("Charged card $" + total);
    } else if (paymentType === "PAYPAL") {
      if (emailAddr.endsWith("@test.com")) {
        order.status = "PAYMENT_FAILED";
        this.email.send(emailAddr, "PayPal payment failed for order #" + order.id);
        return order;
      }
      console.log("Charged PayPal $" + total);
    } else {
      order.status = "PAYMENT_FAILED";
      return order;
    }
    order.status = "PAID";
    this.email.send(emailAddr, "Payment received for order #" + order.id);

    for (const item of items) {
      this.products[item.name].stock -= item.qty;
    }

    // ship
    if (shippingType === "PICKUP") {
      order.status = "READY_FOR_PICKUP";
      this.email.send(emailAddr, "Order #" + order.id + " is ready for pickup");
    } else {
      order.status = "SHIPPED";
      order.tracking = "TRK" + (1000 + order.id);
      this.email.send(emailAddr, "Order #" + order.id + " shipped. Tracking: " + order.tracking);
    }
    return order;
  }

  // estimate shown before checkout
  getShippingCost(shippingType: string, orderAmount: number): number {
    if (shippingType === "STANDARD") return orderAmount > 100 ? 0 : 5;
    if (shippingType === "EXPRESS") return 15;
    return 0;
  }

  printOrder(order: any): void {
    if (!order) return console.log("  (no order)");
    console.log("  Order #" + order.id + " | " + order.customer + " | $" + order.total + " | " + order.status);
  }
}
