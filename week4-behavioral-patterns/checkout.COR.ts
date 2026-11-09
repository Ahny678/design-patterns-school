//Implement Chain of Responsibility for checkout validation.

//set a common handler interface. set the next handler and forward to the request to it.
//implement that interface
//then concrete handlers: authentication, authorization(if admin, add discount), joi validation.

// 1. HANDLER
// Defines the common handling interface
import Joi from "joi";
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: CheckoutRequest): void;
}

interface CheckoutRequest {
  user: {
    id: string;
    isAuthenticated: boolean;
    role: "admin" | "user";
  };
  productId: string;
  quantity: number;
  price: number;
  discount?: number;
}

//BASE HANDLER

abstract class BaseHandler implements Handler {
  protected nextHandler: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }
  handle(request: CheckoutRequest): void {
    this.nextHandler?.handle(request);
  }
}

//AUTH HANDLER
class AuthenticationHandler extends BaseHandler {
  handle(request: CheckoutRequest): void {
    if (!request.user || !request.user.isAuthenticated) {
      throw new Error("Unauthorized: Please log in first");
    }

    console.log("Authentication successful");

    super.handle(request);
  }
}

class AuthorizationHandler extends BaseHandler {
  handle(request: CheckoutRequest): void {
    if (request.user.role === "admin") {
      request.discount = request.price * 0.1;
      request.price -= request.discount;

      console.log("Admin discount applied:", request.discount);
    }

    super.handle(request);
  }
}

class ValidationHandler extends BaseHandler {
  private schema = Joi.object({
    user: Joi.object({
      id: Joi.string().required(),
      isAuthenticated: Joi.boolean().required(),
      role: Joi.string().valid("admin", "user").required(),
    }).required(),

    productId: Joi.string().required(),

    quantity: Joi.number().integer().min(1).required(),

    price: Joi.number().positive().required(),

    discount: Joi.number().min(0).optional(),
  });

  handle(request: CheckoutRequest): void {
    const { error } = this.schema.validate(request);

    if (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }

    console.log("Checkout validation successful");

    super.handle(request);
  }
}

//CLIENT CODE
const authentication = new AuthenticationHandler();
const authorization = new AuthorizationHandler();
const validation = new ValidationHandler();

//set next will make super.handle know what to call

authentication.setNext(authorization).setNext(validation);

const checkoutRequest: CheckoutRequest = {
  user: {
    id: "123",
    isAuthenticated: true,
    role: "admin",
  },
  productId: "product-001",
  quantity: 2,
  price: 1000,
};

try {
  authentication.handle(checkoutRequest);

  console.log("Final checkout request:", checkoutRequest);
} catch (error) {
  console.error((error as Error).message);
}
