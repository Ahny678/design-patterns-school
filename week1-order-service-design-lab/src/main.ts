import { OrderService } from "./OrderService";
import { VipOrderService } from "./VipOrderService";

const service = new OrderService();

console.log("\n--- 1. Successful card order ---");
service.printOrder(service.placeOrder("Ada", "ada@mail.com", [{ name: "MOUSE", qty: 2 }], "CARD", "STANDARD"));

console.log("\n--- 2. Card payment over limit fails ---");
service.printOrder(service.placeOrder("Bayo", "bayo@mail.com", [{ name: "LAPTOP", qty: 2 }], "CARD", "EXPRESS"));

console.log("\n--- 3. PayPal order for pickup ---");
service.printOrder(service.placeOrder("Chi", "chi@mail.com", [{ name: "BAG", qty: 1 }], "PAYPAL", "PICKUP"));

console.log("\n--- 4. Invalid item ---");
service.printOrder(service.placeOrder("Dayo", "dayo@mail.com", [{ name: "PHONE", qty: 1 }], "CARD", "STANDARD"));

console.log("\n--- 5. VIP customer ---");
const vip = new VipOrderService();
console.log("  VIP shipping estimate: $" + vip.getShippingCost("EXPRESS", 50));
vip.printOrder(vip.placeOrder("Efe", "efe@mail.com", [{ name: "MOUSE", qty: 1 }], "CARD", "EXPRESS"));
