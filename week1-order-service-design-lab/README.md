# Order Service Design Lab

A small, intentionally poorly designed order-processing app for practising design analysis.
It runs correctly; the problem is the design. See `PRACTICAL_TASK.md` for the assignment.

## Prerequisites
- Node.js 18 or later
- npm

## Run
```bash
npm install     # installs TypeScript
npm start       # compiles and runs sample orders
npm test        # compiles and runs the tests
```

## Structure
```
src/OrderService.ts      main service (orders, payments, shipping, notifications)
src/VipOrderService.ts   variant for VIP customers
src/EmailSender.ts       simulated email (prints to console)
src/main.ts              sample scenarios
tests/                   basic tests (Node's built-in test runner)
```

## Business rules
- Standard shipping: $5, free over $100. Express: $15. Pickup: free.
- Card payments over $1000 are declined (simulated).
- PayPal payments fail for `@test.com` addresses (simulated).
