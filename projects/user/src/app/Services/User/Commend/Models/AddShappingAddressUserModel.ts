import { shippingAddressesDto } from '../../../../Core/Dtos/shippingAddressesDto';

export interface AddShappingAddressUserModel {
  userId: string;
  street: string;
  city: string;
  state: string;
  country: string;
  suburb: string;
  postalCode: string;
  houseNumber: string;
  lat: string;
  lon: string;
}
