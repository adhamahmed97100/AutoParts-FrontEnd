import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GetUserOrders } from '../../../../Services/Orders/Queries/Model/GetUserOrders';
import { GetUserIdModel } from '../../../../Services/User/Queries/Models/GetUserIdModels';
import { Routing } from '../../../../Meta/Routing';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from '../../../../Services/Navigation/navigation.service';
import { SharedDataService } from '../../../../Services/SharedDataService/shared-data.service';
import { OrdersService } from '../../../../Services/Orders/Queries/Handler/orders.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ScrollService } from '../../../../Services/scroll.service';
import { ProductImagesDto } from '../../../../Core/Dtos/ProductImagesDto';
import { SharedModuleModule } from '../../../../Shared/Modules/shared-module.module';

@Component({
  selector: 'app-orders',
  imports: [RouterModule, SharedModuleModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  OrdersUser: Array<GetUserOrders> = new Array<GetUserOrders>();
  userInfo: GetUserIdModel = {
    countCard: 0,
    dateCreate: '',
    email: '',
    id: '',
    picture: '',
    name: '',
    phoneNumberDtos: [],
    shippingAddresses: [],
  };
  Ip = Routing.Ip;
  private readonly dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);
  private readonly toster = inject(ToastrService);
  private readonly _NavigationService = inject(NavigationService);
  private readonly _sharedDataService = inject(SharedDataService);
  private readonly _OrderQuereisService = inject(OrdersService);
  private scrollService = inject(ScrollService);

  ngOnInit(): void {
    setTimeout(() => {
      this.scrollService.smoothScroll(1000);
    }, 100);
    this._sharedDataService.currentCUser.subscribe((user) => {
      this.userInfo = user;
      console.log('user', user);
    });

    this.route.data.subscribe(({ userOrders }) => {
      this.OrdersUser = userOrders;
    });
  }
  getMainImage(images: ProductImagesDto[]): string | null {
    if (!images || images.length === 0) return null;
    const main = images.find((img) => img.image.startsWith('main_'));
    return main?.image ?? images[0].image;
  }

  ShowDetails(
    OrdersUser: GetUserOrders,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: OrdersUser,
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  goToProduct(id: string) {
    this._NavigationService.NavigationByUrl('Public/Product/' + id);
  }
}
