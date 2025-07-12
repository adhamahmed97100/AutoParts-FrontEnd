import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { AuthCommendService } from '../Handler/auth-commend.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthValidationService {
  private readonly _ApiSercices = inject(ApiService);

  EmailIsExist(AuhtServices: AuthCommendService): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) new Observable((obs) => obs.next(null));

      return AuhtServices.EamilIsExist({ email: control.value }).pipe(
        map((res) => (res.data ? { EamilIsExist: true } : null))
      );
    };
  }

  verifiyOtp(
    Eamil: string,
    Otp: string,
    AuhtServices: AuthCommendService
  ): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.get(Eamil);
      const otp = control.get(Otp);
      if (!email?.value || !otp?.value) new Observable((obs) => obs.next(null));
      return AuhtServices.VerifyOtp({
        email: email?.value,
        otp: Number(otp?.value),
      }).pipe(
        map((res) => {
          if (res.success) {
            otp?.setErrors({
              ...otp.errors,
              VirfiyOtp: true,
            });
            return { VirfiyOtp: true };
          } else {
            if (otp?.errors) {
              const { VirfiyOtp, ...otherErrors } = otp.errors;
              otp.setErrors(
                Object.keys(otherErrors).length ? otherErrors : null
              );
            }
          }
          return null;
        })
      );
    };
  }
}
