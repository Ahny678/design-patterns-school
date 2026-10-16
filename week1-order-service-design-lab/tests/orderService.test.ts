import { test } from "node:test";
import assert from "node:assert/strict";
import { OrderService } from "../src/OrderService";

test("successful order is shipped and reduces stock", () => {
  const s = new OrderService();
  const order = s.placeOrder("Ada", "ada@mail.com", [{ name: "MOUSE", qty: 2 }], "CARD", "STANDARD");
  assert.equal(order.status, "SHIPPED");
  assert.equal(order.total, 45);
  assert.equal(s.products.MOUSE.stock, 48);
});

test("card payment over $1000 fails", () => {
  const s = new OrderService();
  const order = s.placeOrder("Bayo", "bayo@mail.com", [{ name: "LAPTOP", qty: 2 }], "CARD", "STANDARD");
  assert.equal(order.status, "PAYMENT_FAILED");
  assert.equal(s.products.LAPTOP.stock, 5);
});

test("unknown item returns null", () => {
  const s = new OrderService();
  assert.equal(s.placeOrder("Dayo", "d@mail.com", [{ name: "PHONE", qty: 1 }], "CARD", "STANDARD"), null);
});

test("pickup order is ready for pickup", () => {
  const s = new OrderService();
  const order = s.placeOrder("Chi", "chi@mail.com", [{ name: "BAG", qty: 1 }], "PAYPAL", "PICKUP");
  assert.equal(order.status, "READY_FOR_PICKUP");
});
