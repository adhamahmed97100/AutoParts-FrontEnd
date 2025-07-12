import { orderStatusDto } from '../../../../Core/Dtos/orderStatusDto';
import { productDto } from '../../../../Core/Dtos/productDto';
import { shippingAddressDto } from '../../../../Core/Dtos/shippingAddressDto';
import { userDto } from '../../../../Core/Dtos/userDto';

export interface GetSellerOrders {
  orderID: string;
  user: userDto;
  orderDate: string;
  product: productDto;
  phoneNumber: string;
  quantity: number;
  price: number;
  totalAmount: number;
  status: orderStatusDto;
  shippingAddresses: shippingAddressDto;
}
