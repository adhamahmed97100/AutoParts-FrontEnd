import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { CartService } from '../../../../Services/Cart/Handler/cart.service';
import { NavigationService } from '../../../../Services/Navigation/navigation.service';
import { ToastrService } from 'ngx-toastr';
import { Routing } from '../../../../Meta/Routing';
import { MatFormSharedModule } from '../../../../Shared/Modules/mat-form-shared.module';
import * as L from 'leaflet';
import { OrderCommendService } from '../../../../Services/Orders/Commend/Handler/order-commend.service';
import { SharedDataService } from '../../../../Services/SharedDataService/shared-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MapPickerComponent } from './map-picker/map-picker.component';
import { PhoneComponent } from './phone/phone.component';
import { CheckOutModel } from '../../../../Services/Orders/Commend/Models/CheckOutModels';
import { CheckOutComponent } from '../check-out/check-out.component';
import { GetcartUser } from '../../../../Services/Cart/Models/CartItem';
import { NotFoundComponent } from '../../Components/not-found/not-found.component';
import { ScrollService } from '../../../../Services/scroll.service';
import { ProductImagesDto } from '../../../../Core/Dtos/ProductImagesDto';
import { SharedModuleModule } from '../../../../Shared/Modules/shared-module.module';
import { ConfirmDialogComponent } from './confirm-dialog.component';
@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    MatFormSharedModule,
    RouterModule,
    MatStepperModule,
    NotFoundComponent,
    SharedModuleModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  //#region  Fields
  Card: GetcartUser = { cardID: '', cardItemsDtos: [] };
  Ip = Routing.Ip;
  orderSummary: OrderSummary = {
    Discount: 0,
    Shipping: 0,
    Subtotal: 0,
    Total: 0,
  };

  address: string = '';

  phone: string = '';

  get isPhoneDisabled(): boolean {
    return this.address.trim() === '';
  }

  get isCheckoutDisabled(): boolean {
    return this.phone.trim() === '';
  }
  //#endregion

  //#region Inject
  private readonly route = inject(ActivatedRoute);
  private readonly _CartService = inject(CartService);
  private readonly _OrderServices = inject(OrderCommendService);
  private readonly _sharedDataService = inject(SharedDataService);
  private readonly _NavigationService = inject(NavigationService);
  private readonly dialog = inject(MatDialog);
  private readonly toster = inject(ToastrService);
  private scrollService = inject(ScrollService);

  //#endregion

  //#region  LiveHooks
  ngOnInit(): void {
    this.route.data.subscribe(({ CardUser }) => {
      this.Card = CardUser;
      this.CalcOrderSummary(this.Card);
    });
    setTimeout(() => {
      this.scrollService.smoothScroll(1000);
    }, 100);
  }
  getMainImage(images: ProductImagesDto[]): string | null {
    if (!images || images.length === 0) return null;
    const main = images.find((img) => img.image.startsWith('main_'));
    return main?.image ?? images[0].image;
  }

  openMapDialog(stepper: MatStepper) {
    console.log('Opening dialog...');
    const dialogRef = this.dialog.open(MapPickerComponent, {
      data: this.address,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.address = result;

        stepper.next();
      }
    });
  }
  goToProduct(Id: string) {
    this._NavigationService.NavigationByUrl('/Public/Product/' + Id);
  }
  openPhoneDialog(stepper: MatStepper) {
    const dialogRef = this.dialog.open(PhoneComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.phone = result;
        stepper.next();
      }
    });
  }

  openPopupIfLocationEnabled(stepper: MatStepper) {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((result) => {
        if (result.state === 'granted') {
          this.openMapDialog(stepper);
        } else if (result.state === 'prompt') {
          // لو لسه المستخدم ما وافقش، نحاول نطلب الموقع
          navigator.geolocation.getCurrentPosition(
            () => {
              this.openMapDialog(stepper);
            },
            () => {
              this.toster.warning(' يجب تفعيل الموقع الجغرافي لفتح الخريطة!');
            }
          );
        } else {
          this.toster.warning(
            ' تم رفض إذن الموقع! يرجى تفعيله من إعدادات المتصفح.'
          );
        }
      })
      .catch((error) => {
        this.toster.error('❌ خطأ أثناء فحص إذن الموقع:', error);
      });
  }
  //#endregion

  //#region Methods
  CalcOrderSummary(Card: GetcartUser): OrderSummary {
    // Reset all values before calculation
    this.orderSummary.Subtotal = 0;
    this.orderSummary.Discount = 0;
    this.orderSummary.Shipping = 0;

    Card.cardItemsDtos.forEach((element) => {
      this.orderSummary.Subtotal += element.product.price * element.quantity;
    });

    // Correcting total calculation by subtracting Discount
    this.orderSummary.Total =
      this.orderSummary.Subtotal +
      this.orderSummary.Shipping -
      this.orderSummary.Discount;

    return this.orderSummary;
  }

  updateQuantity(cardItemsId: string, quantity: number) {
    if (quantity >= 1) {
      this._CartService
        .UpdateCardItemsToCart({ cardItemsId, quantity })
        .subscribe({
          next: (res) => {
            if (res.success) {
              var carditems = this.Card.cardItemsDtos.find(
                (x: any) => x.id == cardItemsId
              );
              if (carditems) carditems.quantity = quantity;
              this.CalcOrderSummary(this.Card);
            }
          },
        });
    }
  }

  DeleteCartItems(id: string) {
    const itemToDelete = this.Card.cardItemsDtos.find((x) => x.id === id);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { productName: itemToDelete?.product.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._CartService.DeleteCardItemsToCart(id).subscribe({
          next: (res) => {
            if (res.success) {
              this.Card.cardItemsDtos = this.Card.cardItemsDtos.filter(
                (x: any) => x.id != id
              );

              this.CalcOrderSummary(this.Card);
              this._sharedDataService.updateCartCount(-1);
              this.toster.success('Item deleted successfully');
            }
          },
        });
      }
    });
  }

  Checkout() {
    var request: CheckOutModel = {
      userID: localStorage.getItem('userId') ?? '',
      phoneNumberId: this.phone,
      shippingAddressId: this.address,
      paymentMethod: {
        paymentMethod: 'Visa',
        transactionID: '',
        amount: this.orderSummary.Total,
      },
      orderItems: this.Card.cardItemsDtos.map((x: any) => {
        return { productID: x.product.productID, quantity: x.quantity };
      }),
    } as CheckOutModel;

    const dialogRef = this.dialog.open(CheckOutComponent, {
      width: '700px',
      height: '650px',
      panelClass: 'custom-dialog-container',

      data: request,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.phone = result;
      }
    });
  }
}
export interface OrderSummary {
  Subtotal: number;
  Discount: number;
  Shipping: number;
  Total: number;
}
