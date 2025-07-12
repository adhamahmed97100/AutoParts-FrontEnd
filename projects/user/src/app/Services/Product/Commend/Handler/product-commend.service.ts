import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { ApiService } from '../../../Api/api.service';
import { AddUserReviewModel } from '../Models/AddUserReviewModel';
import { Routing } from '../../../../Meta/Routing';
import { Response } from '../../../../Core/BasicResponse/Response';

@Injectable({
  providedIn: 'root',
})
export class ProductCommendService {
  //#region Injectors
  private readonly _ApiServices = inject(ApiService);
  //#endregion

  //#region Implemntation
  AddUserReview(request: AddUserReviewModel): Observable<Response<string>> {
    return this._ApiServices.Post<Response<string>>(
      Routing.Review.Add,
      request
    );
  }
  //#endregion
}
