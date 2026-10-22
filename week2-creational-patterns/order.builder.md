# TASK: Implement Builder for constructing a complex order

## Example task: Build a complex food order

Imagine you're building a food delivery system. Your task is to implement the Builder pattern for constructing a complex order.

A customer places the following order:

- **Customer:** John
- **Restaurant:** Big Bite Kitchen
- **Main meal:** 2 beef burgers
- **Side dishes:** 1 large fries and 2 chicken wings
- **Drinks:** 2 bottles of Coke
- **Customisation:** No onions on the burgers, extra cheese
- **Delivery:** Home delivery to 15 Stadium Road
- **Payment method:** Debit card
- **Discount:** 10% off the order
- **Special instruction:** Call the customer on arrival

## Pseudocode

### Interfaces

```text
Interfaces: side dishes([count, type]), drinks([number, type])
```

### Side dish types

```text
Side dish types: chicken wings, large fries, coleslaw
```

### Drinks types

```text
Drinks types: coke, fanta, sprite
```

### Payment methods

```text
Payment methods: debit card, transfer, ussd
```

### Delivery types

```text
Delivery types: home, work, church
```

### Order class

```text
class Order {
    constructor(
        customer,
        restaurant,
        mainMeal,
        sideDish,
        drinks,
        paymentMethod,
        deliveryType,
        customization,
        discount,
        specialInstruction
    )
}
```

### OrderBuilder class

```text
Class OrderBuilder {
    customer = "Tee”,
    restaurant = "Tees Shop”,
    mainMeal = "Fried Rice”,
    paymentMethod = "debit card”
    delivery = ["home”, “Calabar”]

    //the rest can just be declared since they are optional

    setCustomer(customer: string): this {
        this.customer = customer;
        return this;
    }

    //repeat for single variables. Then for the one with interfaces do like this

    setSideDish(sideDish: sideDishInterface[]): this {
        this.sideDish = sideDish;
        return this;
    }

    build(): Order {
        return new Order(
            this.customer,
            this.restaurant,
            this.mainMeal
            //keep going for the rest
        );
    }
}
```

### Actual usage

```text
const myOrder = new OrderBuilder()
    .setCustomer(“BigSteph”)
    .setCustomization(“make sure it’s hot”)
    .setSideDish([
        {1, “large fries”},
        {2, “chicken wings”}
    ])
    .build()
```