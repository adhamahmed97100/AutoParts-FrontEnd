import { Component, OnInit, inject } from '@angular/core';
import { NavigationService } from '../../../../Services/Navigation/navigation.service';
import { SellerService } from '../../../../Services/Seller/Handler/seller.service';
import { SharedDataService } from '../../../../Services/SharedDataService/shared-data.service';
import { GetSellerModel } from '../../../../Services/Seller/Models/GetSellerModel';
import { RouterModule } from '@angular/router';
import { GetUserNotification } from '../../../../Services/Notification/Models/GetUserNotification';
import { NotificationService } from '../../../../Services/Notification/notification.service';
import { Response } from '../../../../Core/BasicResponse/Response';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ProductWarningDialogComponent } from './product-warning-dialog/product-warning-dialog.component';
import { ProductUpdateDialogComponent } from '../../../../Shared/Components/product-update-dialog/product-update-dialog.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  Seller: GetSellerModel = {
    ContactInfo: '',
    country: '',
    dateCreate: '',
    email: '',
    id: '',
    name: '',
    picture: '',
    sellerId: '',
    ShopName: '',
    type: '',
  };

  private readonly _notificationService = inject(NotificationService);
  notifications: GetUserNotification[] = [];
  SellerId = localStorage.getItem('sellerID');
  userid = localStorage.getItem('userID');
  private readonly SellerSrvices = inject(SellerService);
  private readonly ShearData = inject(SharedDataService);
  private readonly NavigationUrl = inject(NavigationService);
  private readonly dialog = inject(MatDialog);
  private readonly navigationService = inject(NavigationService);

  ngOnInit(): void {
    if (this.SellerId) {
      this.loadSellerData();
      this.loadNotifications();
      if (this.userid) {
        this._notificationService
          .GetNotifications(this.userid)
          .subscribe((res) => {
            this.notifications = res.data;
            this.addStaticNotifications();
          });
      }
      this._notificationService.notifications$.subscribe((message) => {
        this.notifications.push(message);
      });
    }
  }

  private loadSellerData(): void {
    this.SellerSrvices.GetSellerWithId(this.SellerId!).subscribe({
      next: (res) => {
        if (res.success) {
          this.ShearData.UpdateSeller(res.data);
          this.Seller = res.data;
        }
      },
      error: (error) => {
        console.error('Error loading seller data:', error);
      },
    });
  }

  private loadNotifications(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this._notificationService.GetNotifications(userId).subscribe({
        next: (res: Response<GetUserNotification[]>) => {
          if (res.success) {
            this.notifications = res.data;
          }
        },
        error: (error) => {
          console.error('Error loading notifications:', error);
        },
      });
    }
  }

  private addStaticNotifications(): void {
    const updateNotification: GetUserNotification = {
      id: 'static-update-notification',
      title: 'Have You Updated Your Products This Week?',
      message: 'Please Confirm Within 24 Hours',
      isRead: false,
      createdAt: new Date(),
      type: 'alert',
      receiverType: 2,
    };

    const warningNotification: GetUserNotification = {
      id: 'static-warning-notification',
      title: 'First Warning: Your Products Are Now Marked as "Out of stock"',
      message: 'Product ID: 7bc68517-aade-40ad-b4f2-20f970b9c26c',
      isRead: false,
      createdAt: new Date(),
      type: 'warning',
      receiverType: 2,
    };
    this.notifications.unshift(updateNotification);
    this.notifications.unshift(warningNotification);
  }

  openProductUpdateDialog(): void {
    const dialogRef = this.dialog.open(ProductUpdateDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog result:', result);
      }
    });
  }

  openProductWarningDialog(): void {
    const dialogRef = this.dialog.open(ProductWarningDialogComponent, {
      width: '500px',
      data: {
        productId: '7bc68517-aade-40ad-b4f2-20f970b9c26c',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        this.navigationService.NavigationByUrl(
          `Security/ManagmentProduct/EditProduct/7bc68517-aade-40ad-b4f2-20f970b9c26c`
        );
      }
    });
  }

  Logout() {
    localStorage.removeItem('sellerID');
    localStorage.removeItem('roles');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.NavigationUrl.NavigationByUrl('Auth/login');
  }
}
