# Decorator Practice

`SimplePaymentService` works. Add logging and metrics **without editing it**.

## Tasks
1. Create a `LoggingPaymentService` decorator that logs each call (method, arguments, result or error).
2. Create a `MetricsPaymentService` decorator that tracks, per method: call count, failure count, and average duration in ms. Add a way to print them.
3. Both decorators must implement `PaymentService`, so `run()` in `main.ts` works with them unchanged.
4. Stack them in `main.ts`: metrics around logging around the real service. Then swap the order — what changes?
5. Errors must still reach the caller after being logged or counted.
6. Add tests for your decorators (tip: use a small fake `PaymentService` instead of the real one).

## Think about
- Why is this better than adding `console.log` inside `SimplePaymentService`?
- How is this different from subclassing `SimplePaymentService`?
- When would a decorator be overkill?

## Run
    npm install
    npm start
    npm test
