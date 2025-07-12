import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { Observable } from 'rxjs';
import { RegisterModel } from '../Models/RegisterModel';
import { Response } from '../../../../Core/BasicResponse/Response';
import { Routing } from '../../../../Meta/Routing';
import { LoginModel } from '../Models/LoginModel';
import { AuthResponse } from '../Response/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthCommendService {
  private readonly Api = inject(ApiService);

  Registration(request: RegisterModel): Observable<Response<string>> {
    return this.Api.Post<Response<string>>(
      Routing.Authentication.RegisterUser,
      request
    );
  }
  GetAuthGoogle(): Observable<any> {
    return this.Api.Get<any>(Routing.Authentication.GetToken, {
      withCredentials: true,
    });
  }

  Login(request: LoginModel): Observable<Response<AuthResponse>> {
    return this.Api.Post<Response<AuthResponse>>(
      Routing.Authentication.LoginUser,
      request
    );
  }
}
