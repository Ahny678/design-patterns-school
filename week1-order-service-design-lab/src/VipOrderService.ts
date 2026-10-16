import { OrderService } from "./OrderService";

// VIP customers always get free shipping
export class VipOrderService extends OrderService {
  getShippingCost(shippingType: string, orderAmount: number): number {
    return 0;
  }
}
