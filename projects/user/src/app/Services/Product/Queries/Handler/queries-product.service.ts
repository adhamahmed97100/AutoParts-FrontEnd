import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { map, Observable } from 'rxjs';
import { PaginationResponse } from '../../../../Core/BasicResponse/PaginationResponse';
import { GetProducts } from '../Models/GetProducts';
import { Routing } from '../../../../Meta/Routing';
import { Response } from '../../../../Core/BasicResponse/Response';
import { GetProductById } from '../Models/GetProductById';

@Injectable({
  providedIn: 'root',
})
export class QueriesProductService {
  //#region Fialds

  //#endregion

  //#region Injectors
  private readonly Api = inject(ApiService);
  //#endregion

  //#region Implemntation
  GetProuctsWihtPagination(
    pageNumber: number,
    pageSize: number,
    filter?: object
  ): Observable<PaginationResponse<GetProducts>> {
    return this.Api.GetWithPagination<PaginationResponse<GetProducts>>(
      Routing.Product.GetProductPagination,
      pageNumber,
      pageSize,
      filter
    );
  }
  //#endregion

  AutoCompleteSearch(text: string): Observable<Response<Array<string>>> {
    return this.Api.Get<Response<Array<string>>>(
      Routing.Product.AutoCompleteSearch.replace('{Text}', text),
      {
        headers: {
          'Skip-Loader': 'true',
        },
      }
    );
  }

  getProductDetails(productID: string): Observable<Response<GetProductById>> {
    return this.Api.Get<Response<GetProductById>>(
      Routing.Product.GetProductDetails.replace('{Id}', productID)
    );
  }
}
