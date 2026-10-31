//Build a small checkout Facade that delegates to other components.

//RAW ALGO
//To checkout, I need to calculate shipping fee, discounts, taxes then create payment intent. 
//two main objects: user(name, taxBracket), order(items[], discount)
//calcShippingFee(amount, totalCount), calcDiscount(amount, %), calcTaxes(taxBracket,amount) paymentProvider.paymentIntent(finalAmount)  
//finalAmunt: shipping fee + amount + taxes - discountAmount

//client code will call checkoutFacade(user,order)
//CheckoutFacade handles the rest process and returns payment Intent.  


//FACADE BASIC CODE 

class CheckoutFacade {
  constructor(shipping, discount, tax, payment) {
    this.shipping = shipping;
    this.discount = discount;
    this.tax = tax;
    this.payment = payment;
  }

  checkout(user, order) {
    const subtotal = order.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const itemCount = order.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const shippingFee = this.shipping.calculate(
      subtotal,
      itemCount
    );

    const discountAmount = this.discount.calculate(
      subtotal,
      order.discount
    );

    const taxableAmount = subtotal + shippingFee - discountAmount;

    const taxes = this.tax.calculate(
      user.taxBracket,
      taxableAmount
    );

    const finalAmount = taxableAmount + taxes;

    const paymentIntent = this.payment.paymentIntent(finalAmount);

    return paymentIntent;
  }
}

//CLIENT CODE
const checkoutFacade = new CheckoutFacade()
const paymentIntent = checkoutFacade.checkout(user, order);
return paymentIntent