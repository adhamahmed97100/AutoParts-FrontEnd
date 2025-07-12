import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AuthValidationService } from '../../../../../Services/Auth/Commend/Validation/auth-validation.service';
import { AuthCommendService } from '../../../../../Services/Auth/Commend/Handler/auth-commend.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormSharedModule } from '../../../../../Shared/Modules/mat-form-shared.module';
import { slideInOutAnimation } from '../animations';

@Component({
  selector: 'app-account-setup',
  imports: [MatFormSharedModule],
  templateUrl: './account-setup.component.html',
  styleUrl: './account-setup.component.css',
  animations: [slideInOutAnimation],
})
export class AccountSetupComponent implements OnInit {
  //#region Fialds
  accountForm: FormGroup = new FormGroup({});
  otpForm: FormGroup = new FormGroup({});
  countdown: number = 300;
  countdownInterval: any;
  @Output() submitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  showOtpInput: boolean = false;
  //#endregion

  //#region Injectors
  private readonly _Validation = inject(AuthValidationService);
  private readonly _authCommend = inject(AuthCommendService);
  private readonly _toster = inject(ToastrService);
  private readonly fb = inject(FormBuilder);
  //#endregion

  //#region LiveHooks
  ngOnInit(): void {
    this.InitEmailForm();
    this.otpForm = this.InitOtpForm();
  }
  //#endregion

  //#region intiForm
  InitEmailForm() {
    this._authCommend.getRegistrationData().subscribe((res) => {
      this.accountForm = this.fb.group({
        email: [
          res.email ?? '',
          {
            validators: [Validators.required, Validators.email],
            asyncValidators: [this._Validation.EmailIsExist(this._authCommend)],
            updateOn: 'blur',
          },
        ],
      });
    });
  }
  InitOtpForm(): FormGroup {
    return this.fb.group({
      otp: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
    });
  }
  //#endregion

  //#region Method
  submit() {
    if (this.accountForm.valid && this.otpForm.valid) {
      console.log('submit');
      const email = this.accountForm.get('email')?.value;
      const opt = this.otpForm.get('otp')?.value;
      this._authCommend
        .VerifyOtp({ email: email, otp: Number(opt) })
        .subscribe({
          next: (res) => {
            if (res.success) {
              this._toster.success('Secced Virfiy OTP');
              this._authCommend.updateAccountSetup(this.accountForm.value);
              this.submitted.emit(true);
            } else {
              this._toster.error(res.message);
            }
          },
          error: (error: HttpErrorResponse) => {
            this._toster.error(error.error.message);
          },
        });
    }
  }
  Sendotp(): void {
    if (this.accountForm.valid) {
      var email = this.accountForm.get('email')?.value;
      if (email) {
        this._authCommend.SendOtp(email).subscribe((res) => {
          if (res.success) {
            this._toster.success('Don Send opt To Mail');
            this.startCountdown();
            this.showOtpInput = true;
          }
        });
      }
    }
  }

  startCountdown() {
    this.countdown = 300; // 5 دقائق
    clearInterval(this.countdownInterval);
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  //#endregion

  //#region Geter&Seter
  get countdownMinutes(): number {
    return Math.floor(this.countdown / 60);
  }

  get countdownSeconds(): number {
    return this.countdown % 60;
  }

  get countdownSecondsFormatted(): string {
    return this.countdownSeconds < 10
      ? '0' + this.countdownSeconds
      : this.countdownSeconds.toString();
  }
  //#endregion
}
