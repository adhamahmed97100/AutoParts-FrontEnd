import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { LoginSellerModel } from '../Model/LoginSellerModel';
import { map, Observable } from 'rxjs';
import { AuthResponse } from '../Response/AuthResponse';
import { Response } from '../../../../Core/BasicResponse/Response';
import { Routing } from '../../../../Meta/Routing';

@Injectable({
  providedIn: 'root',
})
export class AuthQueriresService {
  private readonly ApiServices = inject(ApiService);

  LoginServices(request: LoginSellerModel): Observable<Response<AuthResponse>> {
    return this.ApiServices.Post<Response<AuthResponse>>(
      Routing.Authentication.LoginSeller,
      request
    );
  }
}
