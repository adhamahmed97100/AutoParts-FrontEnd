import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PhoneNumberDto } from '../../Core/Dtos/PhoneNumberDto';
import { GetUserIdModel } from '../User/Queries/Models/GetUserIdModels';
import { shippingAddressesDto } from '../../Core/Dtos/shippingAddressesDto';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private cartUserSource = new BehaviorSubject<GetUserIdModel>({
    id: '',
    name: '',
    picture: '',
    email: '',
    dateCreate: '',
    countCard: 0,
    shippingAddresses: [],
    phoneNumberDtos: [],
  });
  currentCUser = this.cartUserSource.asObservable();

  clearCartUser() {
    const currentData = this.cartUserSource.value;

    this.cartUserSource.next({ ...currentData, countCard: 0 });
  }
  updateCartCount(count: number) {
    const currentData = this.cartUserSource.value;
    const newCount = currentData.countCard + count;
    this.cartUserSource.next({ ...currentData, countCard: newCount });
  }
  updatepicture(Picture: string) {
    const currentData = this.cartUserSource.value;

    this.cartUserSource.next({ ...currentData, picture: Picture });
  }
  updateshippingAddresses(shippingAddresses: shippingAddressesDto) {
    const currentData = this.cartUserSource.value;

    // إنشاء نسخة جديدة من shippingAddresses وإضافة العنوان الجديد
    const updatedAddresses = [
      ...currentData.shippingAddresses,
      shippingAddresses,
    ];

    // تحديث BehaviorSubject بالقيمة الجديدة
    this.cartUserSource.next({
      ...currentData,
      shippingAddresses: updatedAddresses,
    });
  }

  updatePhoneNumber(phoneNumber: PhoneNumberDto) {
    const currentData = this.cartUserSource.value;

    // إنشاء نسخة جديدة من shippingAddresses وإضافة العنوان الجديد
    const updatedPhoneNumbers = [...currentData.phoneNumberDtos, phoneNumber];

    // تحديث BehaviorSubject بالقيمة الجديدة
    this.cartUserSource.next({
      ...currentData,
      phoneNumberDtos: updatedPhoneNumbers,
    });
  }

  updatesuer(user: GetUserIdModel) {
    this.cartUserSource.next(user);
  }
}
