import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { Observable } from 'rxjs';

import { GetCarBrandModel } from '../Models/GetCarBrandModel';
import { Routing } from '../../../../Meta/Routing';
import { PagintationResponse } from '../../../../Core/BasicResponse/PagintationResponse';

@Injectable({
  providedIn: 'root',
})
export class CarBrandQueriesService {
  private readonly _apiService = inject(ApiService);

  GeTCarBrandsWithPagination(
    pageNumber: number,
    pageSize: number,
    filter?: object
  ): Observable<PagintationResponse<GetCarBrandModel>> {
    return this._apiService.GetWithPagination<
      PagintationResponse<GetCarBrandModel>
    >(Routing.Car.GetCarBrandsWithPagination, pageNumber, pageSize, filter);
  }
}
