import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../../../Core/BasicResponse/PaginationResponse';
import { GetCarBrandModel } from '../Models/GetCarBrandModel';
import { Routing } from '../../../../Meta/Routing';
import { MakerBrandDto } from '../../../../Core/Dtos/MakerBrandDto';
import { Response } from '../../../../Core/BasicResponse/Response';

@Injectable({
  providedIn: 'root',
})
export class CarBrandQueriesService {
  private readonly _apiService = inject(ApiService);

  GetBrandById(id: string): Observable<Response<MakerBrandDto>> {
    return this._apiService.Get(
      Routing.Car.GetCarBrandsById.replace('{Id}', id)
    );
  }
  GeTCarBrandsWithPagination(
    pageNumber: number,
    pageSize: number,
    filter?: object
  ): Observable<PaginationResponse<GetCarBrandModel>> {
    return this._apiService.GetWithPagination<
      PaginationResponse<GetCarBrandModel>
    >(Routing.Car.GetCarBrandsWithPagination, pageNumber, pageSize, filter);
  }
}
