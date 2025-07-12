import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { map, Observable } from 'rxjs';
import { Response } from '../../../../Core/BasicResponse/Response';
import { Routing } from '../../../../Meta/Routing';
import { GetSellerOrders } from '../Models/GetSellerOrders';
import { PagintationResponse } from '../../../../Core/BasicResponse/PagintationResponse';

@Injectable({
  providedIn: 'root',
})
export class OrderQueriesService {
  private readonly ApiServices = inject(ApiService);

  GetOrderSeller(
    PageNumber: number,
    PageSize: number,
    filter: any = {}
  ): Observable<PagintationResponse<GetSellerOrders>> {
    filter['sellerID'] = localStorage.getItem('sellerID');
    return this.ApiServices.GetWithPagination<
      PagintationResponse<GetSellerOrders>
    >(Routing.Orders.GetSellerOrders, PageNumber, PageSize, filter);
  }
}
