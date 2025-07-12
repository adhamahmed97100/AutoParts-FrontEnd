import { Component, inject, OnInit } from '@angular/core';
import { AuthCommendService } from '../../../../Services/Auth/Commend/Handler/auth-commend.service';
import { NavigationService } from '../../../../Services/Navigation/navigation.service';
import { ToastrService } from 'ngx-toastr';
import { RegistrationModel } from '../../../../Services/Auth/Commend/Models/RegistrationModel';
import { AccountSetupComponent } from './account-setup/account-setup.component';
import { CountrySelectionComponent } from './country-selection/country-selection.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ShopInformationComponent } from './shop-information/shop-information.component';

@Component({
  selector: 'app-register',
  imports: [
    AccountSetupComponent,
    CountrySelectionComponent,
    PersonalInformationComponent,
    ShopInformationComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  currentStep = 1;

  private readonly tostor = inject(ToastrService);
  private readonly Navigation = inject(NavigationService);
  constructor(private registrationService: AuthCommendService) {}

  goToNextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  handleFormSubmission(event: boolean) {
    if (event) {
      this.goToNextStep();
    }
  }
  completeRegistration() {
    var requstMapping: RegistrationModel;

    this.registrationService.getRegistrationData().subscribe((res) => {
      requstMapping = this.MappingRegistration(res);
      this.registrationService
        .submitRegistration(requstMapping)
        .subscribe((res) => {
          if (res.success) {
            // toastar
            this.tostor.success('Seccus Registration');
            //redirect login
            this.Navigation.NavigationByUrl('Auth/Login');
          }
        });
      // this.tostor.success('Seccus Registration');
      // this.Navigation.NavigationByUrl('Auth/Login');
    });
  }

  MappingRegistration(data: any): RegistrationModel {
    var Mapping: RegistrationModel = {
      accountType: data.accountType,
      email: data.email,
      country: data.country,
      userName: data.firstName + data.lastName,
      contactInfo: data.phoneNumber,
      shopName: data.shopName,
      password: data.password,
      comperPassword: data.confirmPassword,
    };
    return Mapping;
  }
}
