import { AfterViewInit, Component, inject } from '@angular/core';
import { MatFormSharedModule } from '../../../../Shared/Modules/mat-form-shared.module';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { OrderCommendService } from '../../../../Services/Orders/Commend/Handler/order-commend.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from '../../../../Services/Navigation/navigation.service';
import { SharedDataService } from '../../../../Services/SharedDataService/shared-data.service';

@Component({
  selector: 'app-check-out',
  imports: [MatDialogModule, MatFormSharedModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements AfterViewInit {
  private readonly model = inject(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<CheckOutComponent>);
  private readonly _OrderServices = inject(OrderCommendService);
  private readonly _sharedDataService = inject(SharedDataService);
  private readonly _TosterServcies = inject(ToastrService);
  private readonly _NavigationService = inject(NavigationService);

  ngAfterViewInit(): void {
    document
      .querySelector('.card-number-input')!
      .addEventListener('input', () => {
        (document.querySelector('.card-number-box') as HTMLElement).innerText =
          (
            document.querySelector('.card-number-input') as HTMLInputElement
          ).value;
      });

    document
      .querySelector('.card-holder-input')!
      .addEventListener('input', () => {
        (document.querySelector('.card-holder-name') as HTMLElement).innerText =
          (
            document.querySelector('.card-holder-input') as HTMLInputElement
          ).value;
      });

    document.querySelector('.month-input')!.addEventListener('input', () => {
      (document.querySelector('.exp-month') as HTMLElement).innerText = (
        document.querySelector('.month-input') as HTMLSelectElement
      ).value;
    });

    document.querySelector('.year-input')!.addEventListener('input', () => {
      (document.querySelector('.exp-year') as HTMLElement).innerText = (
        document.querySelector('.year-input') as HTMLSelectElement
      ).value;
    });

    const cvvInput = document.querySelector('.cvv-input');
    const front = document.querySelector('.front') as HTMLElement;
    const back = document.querySelector('.back') as HTMLElement;

    if (cvvInput) {
      cvvInput.addEventListener('mouseenter', () => {
        front.style.transform = 'perspective(1000px) rotateY(-180deg)';
        back.style.transform = 'perspective(1000px) rotateY(0deg)';
      });

      cvvInput.addEventListener('mouseleave', () => {
        front.style.transform = 'perspective(1000px) rotateY(0deg)';
        back.style.transform = 'perspective(1000px) rotateY(180deg)';
      });

      cvvInput.addEventListener('input', () => {
        (document.querySelector('.cvv-box') as HTMLElement).innerText = (
          cvvInput as HTMLInputElement
        ).value;
      });
    }
  }

  submit() {
    var cardNumber = (
      document.querySelector('.card-number-input') as HTMLInputElement
    )?.value;
    var cardHolder = (
      document.querySelector('.card-holder-input') as HTMLInputElement
    )?.value;
    var expMonth = (document.querySelector('.month-input') as HTMLSelectElement)
      ?.value;
    var expYear = (document.querySelector('.year-input') as HTMLSelectElement)
      ?.value;
    var cvv = (document.querySelector('.cvv-input') as HTMLInputElement)?.value;
    this.model.paymentMethod.transactionID = this.generateGUID();

    if (cardNumber && cardHolder && expMonth && expYear && cvv) {
      this._OrderServices.CheckOutServices(this.model).subscribe({
        next: (res) => {
          if (res.success) {
            this._TosterServcies.success('Success Add Order');
            this.dialogRef.close();
            this._NavigationService.NavigationByUrl('Security/orders');
            this._sharedDataService.clearCartUser();
          }
        },
      });
    }
  }
  private generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
