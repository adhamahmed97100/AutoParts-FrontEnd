import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { Observable } from 'rxjs';
import { Response } from '../../../../Core/BasicResponse/Response';
import { GetModelWithBrand } from '../Models/GetModelWithBrand';
import { Routing } from '../../../../Meta/Routing';

@Injectable({
  providedIn: 'root',
})
export class ModelQuereisService {
  private readonly _apiService = inject(ApiService);

  GetModelsWithBarnd(
    BrandId: string
  ): Observable<Response<Array<GetModelWithBrand>>> {
    return this._apiService.Get<Response<Array<GetModelWithBrand>>>(
      Routing.Model.GetModelsWithBarnd.replace('{Id}', BrandId)
    );
  }
  GetModelById(Id: string): Observable<Response<GetModelWithBrand>> {
    return this._apiService.Get<Response<GetModelWithBrand>>(
      Routing.Model.GetModelById.replace('{Id}', Id)
    );
  }
}
