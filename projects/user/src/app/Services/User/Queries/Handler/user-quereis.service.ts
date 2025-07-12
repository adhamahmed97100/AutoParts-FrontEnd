import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { Routing } from '../../../../Meta/Routing';
import { GetUserIdModel } from '../Models/GetUserIdModels';
import { Observable } from 'rxjs';
import { Response } from '../../../../Core/BasicResponse/Response';
import { GetUserAddressModel } from '../Models/GetUserAddress.Models';

@Injectable({
  providedIn: 'root',
})
export class UserQuereisService {
  private readonly _apiService = inject(ApiService);

  GetUserServices(id: string): Observable<Response<GetUserIdModel>> {
    return this._apiService.Get<Response<GetUserIdModel>>(
      Routing.User.GetUserById.replace('{Id}', id)
    );
  }
  GetUserAddress(id: string): Observable<Response<Array<GetUserAddressModel>>> {
    return this._apiService.Get<Response<Array<GetUserAddressModel>>>(
      Routing.User.GetShippingAddresses.replace('{Id}', id)
    );
  }
}
