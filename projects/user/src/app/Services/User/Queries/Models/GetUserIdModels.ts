import { PhoneNumberDto } from '../../../../Core/Dtos/PhoneNumberDto';
import { shippingAddressesDto } from '../../../../Core/Dtos/shippingAddressesDto';

export interface GetUserIdModel {
  id: string;
  name: string;
  email: string;
  dateCreate: string;
  picture: string;
  countCard: number;
  shippingAddresses: shippingAddressesDto[];
  phoneNumberDtos: PhoneNumberDto[];
}
