import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Routing } from '../../../../Meta/Routing';
import { ApiService } from '../../../Api/api.service';
import { EmailIsExistModel } from '../Models/EmailIsExist';
import { Response } from '../../../../Core/BasicResponse/Response';
import { VerifyOtpModel } from '../Models/VerifyOtpModel';
import { RegistrationModel } from '../Models/RegistrationModel';

@Injectable({
  providedIn: 'root',
})
export class AuthCommendService {
  private registrationData = new BehaviorSubject<any>({});

  private readonly _apiServices = inject(ApiService);

  constructor(private http: HttpClient) {}

  updateShopInformation(data: any) {
    const currentData = this.registrationData.value;
    this.registrationData.next({ ...currentData, ...data });
  }

  updateCountrySelection(data: any) {
    const currentData = this.registrationData.value;
    this.registrationData.next({ ...currentData, ...data });
  }

  updateAccountSetup(data: any) {
    const currentData = this.registrationData.value;
    this.registrationData.next({ ...currentData, ...data });
  }

  updatePersonalInformation(data: any) {
    const currentData = this.registrationData.value;
    this.registrationData.next({ ...currentData, ...data });
  }

  getRegistrationData() {
    return this.registrationData.asObservable();
  }

  submitRegistration(requst: RegistrationModel): Observable<Response<string>> {
    return this._apiServices.Post<Response<string>>(
      Routing.Authentication.RegisterSeller,
      requst
    );
  }

  VerifyOtp(requst: VerifyOtpModel): Observable<Response<string>> {
    return this._apiServices.Post<Response<string>>(
      Routing.Mail.VerifyOtp,
      requst
    );
  }

  SendOtp(email: string): Observable<Response<string>> {
    return this._apiServices.Post<Response<string>>(Routing.Mail.SendOtp, {
      email: email,
    });
  }

  EamilIsExist(requst: EmailIsExistModel): Observable<Response<boolean>> {
    return this._apiServices.Post<Response<boolean>>(
      Routing.Seller.SellerEamilIsExist,
      requst,
      {
        headers: new HttpHeaders().set('Skip-Loader', 'true'),
      }
    );
  }
}
