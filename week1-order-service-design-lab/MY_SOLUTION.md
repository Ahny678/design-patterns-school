Writing

# Weekly Assessment — Design Patterns

## 1\. Order Service Responsibilities

1. Initiates products and orders data.
2. Initiates an email object.
3. Place order: validates the order, adds shipping fee depending on shipping type, places the order, sends the user an email, charges the user based on payment type, ships the order based on shipping type.
4. Get shipping cost.
5. Print order.

## 2\. Problems in It

1. Products and orders dont have a fixed interface.
2. Too many parameters in placeOrder.
3. You should have a separate function for validating order before placing it. BEFORE place order
4. Have a separate function to decide shipping costs before placing order. BEFORE place order.
5. Should send email AFTER place order function not within.
6. Should have a separate payment function and with different implementation depending on payment type. But has the same name.
7. Have a separate shipping function.
8. getShippingCost is a function but it isnt used in order service. Instead we write duplicate code inside place order with additional cases.

## 3\. Consequences

1. Without a defined interface, anything can be passed as an attribute and break the function that uses them.
2. If there are too many parameters, implies that the functions are overly complex.
3. For the problems where it should have separate functions (3,4,5,7): if any of the behaviors change or needs more code, the entire placeOrder function would double in length. Confusing for others to read.
4.
   6. If more payment types comes in the future, would have to add a new case. And each if/else has very different code because it’s specific to a provider. Makes it hard to read.
5. 8 The more we modify how to get the cost of shipping, , the greater the drift between the getShippingCost function.

## 4\. SOLID

1. **Single Responsibility Principle:** Place order should just do one thing. Place the order.
2. **Interface Segregation Principle:** each payment type should be segregated to its provider.
3. **Dependency Inversion Principle:** the class shouldn’t have the actual implementation details. It should just be calling functions and passing the parameters. Should be a black boc. Shouldn’t know exactly what’s going on.

## 5\. Necessary vs Unnecessary

1. **Necessary:** splitting place order to multiple functions. Giving orders+products defined interfaces.
2. **Uncessary:** Having different payment functions for each payment type. It’s just a few lines of code currently and not very detailed so one function is okay.

## 6\. Cleaner Design Pseudocode

```
products: ProductsInterface {price, stock}
orders: OrdersInterface {name, qty, shippingType, paymentType}
customers: CustomerInterface {name, email}

validateOrder(customers, orders)
placeOrder(getShippingFee,total,orders)
sendEmail(customer,order)
makePayment(customer,order)
shipOrder(customer,order)
```