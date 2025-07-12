import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { UpdateStatsOrder } from '../Models/UpdateStatsOrder';
import { Routing } from '../../../../Meta/Routing';
import { map, Observable } from 'rxjs';
import { Response } from '../../../../Core/BasicResponse/Response';

@Injectable({
  providedIn: 'root',
})
export class OrderCommendService {
  private readonly ApiServices = inject(ApiService);

  UpdateOrderStatus(requst: UpdateStatsOrder): Observable<Response<string>> {
    return this.ApiServices.Put(Routing.Orders.UpdateStatus, requst);
  }
}
