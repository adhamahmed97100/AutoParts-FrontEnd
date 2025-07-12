import { inject, Injectable } from '@angular/core';
import { CheckOutModel } from '../Models/CheckOutModels';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../../Api/api.service';
import { Response } from '../../../../Core/BasicResponse/Response';
import { Routing } from '../../../../Meta/Routing';
import { UpdateStatsOrder } from '../../../../../../../seller/src/app/Services/Orders/Commend/Models/UpdateStatsOrder';

@Injectable({
  providedIn: 'root',
})
export class OrderCommendService {
  private readonly _apiServices = inject(ApiService);

  CheckOutServices(request: CheckOutModel): Observable<Response<string>> {
    return this._apiServices.Post<Response<string>>(
      Routing.Order.AddUserOrder,
      request
    );
  }
}
