import { orderItemsDto } from '../../../../Core/Dtos/orderItemsDto';
import { PaymentDto } from '../../../../Core/Dtos/payment-dto';

export interface CheckOutModel {
  userID: string;
  shippingAddressId: string;
  phoneNumberId: string;
  paymentMethod: PaymentDto;
  orderItems: orderItemsDto[];
}
