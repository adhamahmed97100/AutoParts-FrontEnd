import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetSellerModel } from '../Seller/Models/GetSellerModel';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private Seller = new BehaviorSubject<GetSellerModel>({
    ContactInfo: '',
    country: '',
    dateCreate: '',
    email: '',
    id: '',
    name: '',
    picture: '',
    sellerId: '',
    ShopName: '',
    type: '',
  });

  currentSeller = this.Seller.asObservable();

  UpdateSeller(model: GetSellerModel) {
    this.Seller.next(model);
  }
}
