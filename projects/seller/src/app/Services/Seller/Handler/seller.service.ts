import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../Api/api.service';
import { map, Observable } from 'rxjs';
import { GetSellerModel } from '../Models/GetSellerModel';
import { Routing } from '../../../Meta/Routing';
import { Response } from '../../../Core/BasicResponse/Response';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private readonly Api = inject(ApiService);
  GetSellerWithId(id: string): Observable<Response<GetSellerModel>> {
    return this.Api.Get<Response<GetSellerModel>>(
      Routing.Seller.GetSellersById.replace('{Id}', id)
    );
  }
}
