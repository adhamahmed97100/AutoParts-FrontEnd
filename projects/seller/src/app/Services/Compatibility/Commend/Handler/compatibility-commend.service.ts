import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { AddCompatibilityModel } from '../Model/AddCompatibilityModel';
import { Observable } from 'rxjs';
import { Response } from '../../../../Core/BasicResponse/Response';
import { Routing } from '../../../../Meta/Routing';
import { UpdateCompatibilityModel } from '../Model/UpdateCompatibilityModel';
import { GetSKUModel } from '../Model/GetSKUModel';

@Injectable({
  providedIn: 'root',
})
export class CompatibilityCommendService {
  private readonly ApiServices = inject(ApiService);

  GetSKU(sku: string): Observable<Response<Array<GetSKUModel>>> {
    return this.ApiServices.Get<Response<Array<GetSKUModel>>>(
      Routing.Product.GetMaster.replace('{Id}', sku)
    );
  }

  AddModelCompatibility(
    requst: AddCompatibilityModel
  ): Observable<Response<string>> {
    return this.ApiServices.Post<Response<string>>(
      Routing.Model.AddModelCompatibility,
      requst
    );
  }

  UpdateModelCompatibility(
    request: UpdateCompatibilityModel
  ): Observable<Response<string>> {
    return this.ApiServices.Put<Response<string>>(
      Routing.Model.UpdateModelCompatibility,
      request
    );
  }
}
