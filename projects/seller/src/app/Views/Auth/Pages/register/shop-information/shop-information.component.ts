import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthCommendService } from '../../../../../Services/Auth/Commend/Handler/auth-commend.service';
import { MatFormSharedModule } from '../../../../../Shared/Modules/mat-form-shared.module';
import { slideInOutAnimation } from '../animations';

@Component({
  selector: 'app-shop-information',
  imports: [MatFormSharedModule],
  templateUrl: './shop-information.component.html',
  styleUrl: './shop-information.component.css',
  animations: [slideInOutAnimation],
})
export class ShopInformationComponent {
  shopForm: FormGroup = new FormGroup({});
  @Output() submitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) {}
  private readonly _AuthCommendServcies = inject(AuthCommendService);
  ngOnInit(): void {
    this.initializeForm();
  }

  // تهيئة النموذج
  initializeForm(): void {
    this._AuthCommendServcies.getRegistrationData().subscribe((res) => {
      this.shopForm = this.fb.group({
        accountType: [res.accountType ?? '', Validators.required], // نوع الحساب (مطلوب)
        shopName: [res.shopName ?? '', Validators.required], // اسم المتجر (مطلوب)
        referralSource: [res.referralSource ?? '', Validators.required], // مصدر الإحالة (مطلوب)
        termsAccepted: [false, Validators.requiredTrue], // الموافقة على الشروط (مطلوب)
      });
    });
  }

  // تحديد نوع الحساب
  selectAccountType(type: string): void {
    this.shopForm.get('accountType')?.setValue(type);
  }

  // عند إرسال النموذج
  onSubmit(): void {
    if (this.shopForm.valid) {
      this._AuthCommendServcies.updateShopInformation(this.shopForm.value);
      console.log('Form Submitted!', this.shopForm.value);
      this.submitted.emit(true);
      // يمكنك إضافة منطق إضافي هنا، مثل إرسال البيانات إلى الخادم
    } else {
      console.log('Form is invalid');
    }
  }
}
