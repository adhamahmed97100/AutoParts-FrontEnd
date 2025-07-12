import { inject, Injectable } from '@angular/core';
import { AddShappingAddressUserModel } from '../Models/AddShappingAddressUserModel';
import { map, Observable } from 'rxjs';

import { AddPhoneUserModel } from '../Models/AddPhoneUserModel';
import { ApiService } from '../../../Api/api.service';
import { Response } from '../../../../Core/BasicResponse/Response';
import { Routing } from '../../../../Meta/Routing';

@Injectable({
  providedIn: 'root',
})
export class UserCommendService {
  //#region  Injectors
  private readonly _apiService = inject(ApiService);

  //#endregion

  AddPhoneUser(request: AddPhoneUserModel): Observable<Response<string>> {
    return this._apiService.Post<Response<string>>(
      Routing.User.AddPhones,
      request
    );
  }

  AddUserShippingAddress(
    request: AddShappingAddressUserModel
  ): Observable<Response<string>> {
    return this._apiService.Post<Response<string>>(
      Routing.User.AddShippingAddresses,
      request
    );
  }

  UpdatePictureUser(request: FormData): Observable<Response<string>> {
    return this._apiService.Put<Response<string>>(
      Routing.User.UpdateUser,
      request
    );
  }
  // searchAddressByName(
  //   address: string
  // ): Promise<{ lat: string; lon: string; display_name: string }> {
  //   const query = encodeURIComponent(address);
  //   return fetch(
  //     `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`
  //   )
  //     .then((response) => response.json())
  //     .then((results) => {
  //       if (results.length > 0) {
  //         const result = results[0];
  //         return {
  //           lat: result.lat,
  //           lon: result.lon,
  //           display_name: result.display_name,
  //         };
  //       } else {
  //         throw new Error('❌ لم يتم العثور على نتائج للعنوان المطلوب.');
  //       }
  //     });
  // }
  async searchAddressByName(queryText: string): Promise<
    Array<{
      lat: string;
      lon: string;
      display_name: string;
      type: string;
      class: string;
      address: {
        road?: string;
        neighbourhood?: string;
        city?: string;
        county?: string;
        state?: string;
        country?: string;
        [key: string]: any;
      };
    }>
  > {
    const query = encodeURIComponent(queryText);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=10`
    );
    const results = await response.json();

    if (results.length > 0) {
      return results.map((result: any) => ({
        lat: result.lat,
        lon: result.lon,
        display_name: result.display_name,
        type: result.type,
        class: result.class,
        address: result.address,
      }));
    } else {
      throw new Error('❌ مفيش نتائج للعنوان أو المكان اللي كتبتيه.');
    }
  }

  getAddressFromCoordinates(
    lat: number,
    lng: number
  ): Promise<AddShappingAddressUserModel> {
    return fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.address) {
          const address = data.address;
          console.log(data);

          const shippingAddress: AddShappingAddressUserModel = {
            street: address.road || '',
            city: address.state || address.city || '',
            state: address.state || '',
            country: address.country || '',
            postalCode: address.postcode || '',
            suburb: address.suburb || address.neighbourhood || '',
            houseNumber: address.house_number || '',
            lat: lat.toString(),
            lon: lng.toString(),
            userId: localStorage.getItem('userId') || '',
          };
          return shippingAddress;
        }
        throw new Error('❌ لم يتم العثور على العنوان.');
      })
      .catch((error) => {
        console.error('❌ خطأ في جلب العنوان:', error);
        throw error;
      });
  }
}
