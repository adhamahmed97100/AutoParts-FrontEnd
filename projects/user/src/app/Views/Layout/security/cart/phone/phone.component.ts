import { Component, inject, OnInit } from '@angular/core';
import { MatFormSharedModule } from '../../../../../Shared/Modules/mat-form-shared.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { animate, style, transition, trigger } from '@angular/animations';
import { PhoneNumberDto } from '../../../../../Core/Dtos/PhoneNumberDto';
import { UserCommendService } from '../../../../../Services/User/Commend/Handler/user-commend.service';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../../../../Services/SharedDataService/shared-data.service';

@Component({
  selector: 'app-phone',
  imports: [
    MatFormSharedModule,
    MatDialogModule,
    MatDatepickerModule,
    MatCheckboxModule,
  ],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css',
  animations: [
    trigger('expandFade', [
      transition(':enter', [
        style({ height: 0, opacity: 0, overflow: 'hidden' }),
        animate(
          '400ms ease-out',
          style({ height: '*', opacity: 1, overflow: 'visible' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ height: 0, opacity: 0, overflow: 'hidden' })
        ),
      ]),
    ]),
  ],
})
export class PhoneComponent implements OnInit {
  savedPhones: PhoneNumberDto[] = []; // أرقام محفوظة كمثال
  selectedPhone: string = '';
  showPhoneInput: boolean = false;
  newPhoneNumber: string = '';
  private dialogRef = inject(MatDialogRef<PhoneComponent>);
  private readonly _UserCommendService = inject(UserCommendService);
  private readonly toster = inject(ToastrService);
  private readonly _SharedDataService = inject(SharedDataService);

  ngOnInit(): void {
    this._SharedDataService.currentCUser.subscribe((user) => {
      this.savedPhones = user.phoneNumberDtos;
    });
    if (this.savedPhones.length > 0) {
      this.selectedPhone = this.savedPhones[0].id;
    }
  }
  selectPhone(phone: string) {
    this.selectedPhone = phone;
  }

  addNewPhone() {
    if (this.newPhoneNumber.trim()) {
      this._UserCommendService
        .AddPhoneUser({
          phone: this.newPhoneNumber,
          userId: localStorage.getItem('userId') ?? '',
        })
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.toster.success('Secces Add New Iphone Number');
              this._SharedDataService.updatePhoneNumber({
                phoneNumber: this.newPhoneNumber,
                id: res.data,
              });
            }
          },
          complete: () => {
            this.selectedPhone = this.newPhoneNumber;
            this.newPhoneNumber = ''; // تصفية الحقل بعد الإضافة
            this.showPhoneInput = false; // إخفاء حقل الإدخال بعد الحفظ
          },
        });
    }
  }

  submitPhone() {
    this.dialogRef.close(this.selectedPhone);
  }
}
