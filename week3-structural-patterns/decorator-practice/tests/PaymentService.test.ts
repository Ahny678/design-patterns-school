import { test } from "node:test";
import assert from "node:assert/strict";
import { SimplePaymentService } from "../src/PaymentService";

test("charge returns a payment id", async () => {
  const s = new SimplePaymentService();
  assert.equal(await s.charge("c1", 100), "PAY-1");
});

test("charge over limit throws", async () => {
  const s = new SimplePaymentService();
  await assert.rejects(s.charge("c1", 5000));
});

test("refund of unknown payment throws", async () => {
  const s = new SimplePaymentService();
  await assert.rejects(s.refund("PAY-99"));
});
