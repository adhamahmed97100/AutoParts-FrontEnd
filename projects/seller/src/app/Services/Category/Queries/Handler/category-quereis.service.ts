import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { Observable } from 'rxjs';

import { GetCategoryModel } from '../Models/GetCategoryModel';
import { Routing } from '../../../../Meta/Routing';
import { Response } from '../../../../Core/BasicResponse/Response';
import { CategoryDto } from '../../../../Core/Dtos/CategoryDto';
import { PagintationResponse } from '../../../../Core/BasicResponse/PagintationResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoryQuereisService {
  private readonly _apiService = inject(ApiService);

  GetCategories(): Observable<Response<Array<GetCategoryModel>>> {
    return this._apiService.Get<Response<Array<GetCategoryModel>>>(
      Routing.Category.GetCategoryAll
    );
  }
  GetCategoryById(id: string): Observable<Response<CategoryDto>> {
    return this._apiService.Get<Response<CategoryDto>>(
      Routing.Category.GetCategoryById.replace('{Id}', id)
    );
  }
}
