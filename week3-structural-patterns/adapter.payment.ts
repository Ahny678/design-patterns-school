//Implement an Adapter around a mock third-party payment provider.

//Client code: expects to call provider.pay(amount, currency)
//Paystack Provider: expects amount in cents, currency and redirect url 
//Paystackadapter: expects amount and currency. then gets redirect url from env. converts amount to cents. then passes to actual paystack 


//DRY CODE

// Third-party provider (Adaptee)
class Paystack {
  initializePayment(amount, currency, redirectUrl) {
    console.log("Processing payment:", {
      amount,
      currency,
      redirectUrl
    });

    return { status: "success" };
  }
}

// Adapter
class PaystackAdapter {
  constructor(paystack) {
    this.paystack = paystack;
    this.redirectUrl = process.env.REDIRECT_URL;
  }

  pay(amount, currency) {
    const amountInKobo = amount * 100;

    return this.paystack.initializePayment(
      amountInKobo,
      currency,
      this.redirectUrl
    );
  }
}

// Client
const paystack = new Paystack();
const provider = new PaystackAdapter(paystack);

provider.pay(5000, "NGN");