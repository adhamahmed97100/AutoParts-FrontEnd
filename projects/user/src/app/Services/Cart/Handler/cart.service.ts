import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../Api/api.service';
import { Routing } from '../../../Meta/Routing';
import { Response } from '../../../Core/BasicResponse/Response';
import { AddIteamCart } from '../Models/AddToCart';
import { UpdateCardItemsUserModelCommend } from '../Models/UpdateCardItemsUserModelCommend';
import { GetcartUser } from '../Models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private Api: ApiService) {}
  getCart(userid: string): Observable<Response<GetcartUser>> {
    return this.Api.Get<Response<GetcartUser>>(
      Routing.Cart.GetCart.replace('{Id}', userid)
    );
  }
  addToCart(request: AddIteamCart): Observable<Response<string>> {
    return this.Api.Post<Response<string>>(Routing.Cart.AddToCart, request);
  }
  UpdateCardItemsToCart(
    request: UpdateCardItemsUserModelCommend
  ): Observable<Response<string>> {
    return this.Api.Put<Response<string>>(Routing.Cart.UpdateItem, request);
  }

  DeleteCardItemsToCart(id: string): Observable<Response<string>> {
    return this.Api.Delete<Response<string>>(Routing.Cart.RemoveItem, id);
  }
}