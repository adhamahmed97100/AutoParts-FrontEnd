import { GetOrderItemsWithOrderDto } from '../../../../Core/Dtos/get-order-items-with-order-dto';
import { PaymentDto } from '../../../../Core/Dtos/payment-dto';
import { PhoneNumberDto } from '../../../../Core/Dtos/PhoneNumberDto';
import { shippingAddressesDto } from '../../../../Core/Dtos/shippingAddressesDto';
import { OrderStatus } from './Orderstatus';

export interface GetUserOrders {
  orderID: string;
  orderDate: string;
  totalAmount: number;
  status: OrderStatus;
  payment: PaymentDto;
  phone: PhoneNumberDto;
  shippingAddresses: shippingAddressesDto;
  orderItems: GetOrderItemsWithOrderDto[];
}
