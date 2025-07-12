import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthCommendService } from '../../../../../Services/Auth/Commend/Handler/auth-commend.service';
import { MatFormSharedModule } from '../../../../../Shared/Modules/mat-form-shared.module';
import { slideInOutAnimation } from '../animations';

@Component({
  selector: 'app-personal-information',
  imports: [MatFormSharedModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css',
  animations: [slideInOutAnimation],
})
export class PersonalInformationComponent implements OnInit {
  personalForm: FormGroup = new FormGroup({});
  showPassword: boolean = false;
  @Output() submitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  showConfirmPassword: boolean = false;

  private readonly _AuthCommendServcies = inject(AuthCommendService);
  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this._AuthCommendServcies.getRegistrationData().subscribe((res) => {
      this.personalForm = this.fb.group(
        {
          firstName: [res.firstName ?? '', Validators.required],
          lastName: [res.lastName ?? '', Validators.required],
          countryCode: [res.countryCode ?? '+20', Validators.required],
          phoneNumber: [
            res.phoneNumber ?? '',
            [Validators.required, Validators.pattern('^[0-9]{9,15}$')],
          ],
          password: [
            res.password ?? '',
            [Validators.required, Validators.minLength(8)],
          ],
          confirmPassword: [res.confirmPassword ?? '', Validators.required],
        },
        { validators: this.passwordMatchValidator }
      );
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordMatchValidator(form: FormGroup): any {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.personalForm.valid) {
      this._AuthCommendServcies.updatePersonalInformation(
        this.personalForm.value
      );
      this.submitted.emit(true);
      console.log('Form Submitted', this.personalForm.value);
    } else {
      this.personalForm.markAllAsTouched();
    }
  }
}
