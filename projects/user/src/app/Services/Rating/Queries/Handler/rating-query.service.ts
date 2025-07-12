import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { Observable } from 'rxjs';
import { Response } from '../../../../Core/BasicResponse/Response';
import { ReviewStatistic } from '../Model/ReviewStatistic';
import { Routing } from '../../../../Meta/Routing';
import { PaginationResponse } from '../../../../Core/BasicResponse/PaginationResponse';
import { GetProductReviowsModel } from '../Model/GetProductReviowsModel';

@Injectable({
  providedIn: 'root',
})
export class RatingQueryService {
  private readonly Api = inject(ApiService);
  GetReviewStatistic(productID: string): Observable<Response<ReviewStatistic>> {
    return this.Api.Get<Response<ReviewStatistic>>(
      Routing.Review.GetReviewStatistic.replace('{Id}', productID)
    );
  }
  getSellerProductReviews(
    PageNumber: number,
    PageSize: number,
    filter: any
  ): Observable<PaginationResponse<GetProductReviowsModel>> {
    return this.Api.GetWithPagination<
      PaginationResponse<GetProductReviowsModel>
    >(Routing.Review.ProductReview, PageNumber, PageSize, filter);
  }
}
