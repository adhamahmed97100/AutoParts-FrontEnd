import { Component, inject, OnInit } from '@angular/core';
import { MatFormSharedModule } from '../../../Shared/Modules/mat-form-shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthCommendService } from '../../../Services/Auth/Commend/Handler/auth-commend.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from '../../../Services/Navigation/navigation.service';
import { RegisterModel } from '../../../Services/Auth/Commend/Models/RegisterModel';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '../../../Shared/Modules/shared-module.module';
@Component({
  selector: 'app-register',
  imports: [MatFormSharedModule, SharedModuleModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  Form: FormGroup = new FormGroup({});
  hide: boolean = true;
  hideConfirmPassword: boolean = true;

  readonly Bulider = inject(FormBuilder);
  readonly AuthCommend = inject(AuthCommendService);
  private readonly toastrService = inject(ToastrService);
  private readonly Navigation = inject(NavigationService);

  ngOnInit(): void {
    this.Form = this.initFormRegister();
  }
  initFormRegister(): FormGroup {
    return this.Bulider.group({
      userName: [
        '',
        {
          validators: [
            Validators.required,
            Validators.maxLength(20),
            Validators.minLength(3),
          ],
        },
      ],
      email: [
        '',
        {
          validators: [
            Validators.required,
            Validators.email,
            Validators.maxLength(50),
            Validators.minLength(5),
          ],
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required, Validators.minLength(8)],
        },
      ],
      comperPassword: [
        '',
        { validators: [Validators.required, Validators.minLength(8)] },
      ],
    });
  }
  Registeration() {
    if (this.Form.valid) {
      var request: RegisterModel = this.Form.value;
      this.AuthCommend.Registration(request).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastrService.success('Success Registration');
            this.Navigation.NavigationByUrl('/Auth/Login');
          }
        },
        error: (err) => {
          this.toastrService.error(err.error.message);
        },
      });
    }
  }
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
