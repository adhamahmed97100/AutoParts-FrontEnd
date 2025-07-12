import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { GetSellerProductsModel } from '../Models/GetSellerProductsModel';
import { map, Observable } from 'rxjs';
import { PagintationResponse } from '../../../../Core/BasicResponse/PagintationResponse';
import { Routing } from '../../../../Meta/Routing';
import { GetProductReviowsModel } from '../Models/GetProductReviowsModel';
import { Response } from '../../../../Core/BasicResponse/Response';
import { GetProductRatingStatisticsModels } from '../Models/GetProductRatingStatisticsModels';
import { GetSellerProductByidModel } from '../Models/GetSellerProductByidModel';

@Injectable({
  providedIn: 'root',
})
export class ProductQuereisService {
  private readonly _apiServices = inject(ApiService);
  GetProductRatingStatistics(
    productid: string
  ): Observable<Response<GetProductRatingStatisticsModels>> {
    return this._apiServices.Get<Response<GetProductRatingStatisticsModels>>(
      Routing.Review.GetRatingStatistics.replace('{Id}', productid)
    );
  }
  getSellerProductReviews(
    PageNumber: number,
    PageSize: number,
    filter: any
  ): Observable<PagintationResponse<GetProductReviowsModel>> {
    return this._apiServices.GetWithPagination<
      PagintationResponse<GetProductReviowsModel>
    >(Routing.Review.ProductReview, PageNumber, PageSize, filter);
  }
  getSellerProduct(
    PageNumber: number,
    PageSize: number,
    filter: any = {}
  ): Observable<PagintationResponse<GetSellerProductsModel>> {
    filter['sellerID'] = localStorage.getItem('sellerID');
    return this._apiServices.GetWithPagination<
      PagintationResponse<GetSellerProductsModel>
    >(Routing.Seller.GetSellersProducts, PageNumber, PageSize, filter);
  }
  GetProductById(
    productID: string
  ): Observable<Response<GetSellerProductByidModel>> {
    console.log(productID);

    return this._apiServices.Get<Response<GetSellerProductByidModel>>(
      Routing.Seller.GetSellerProductById.replace('{Id}', productID)
    );
  }
}
