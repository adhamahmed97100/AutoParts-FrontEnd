import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import moment from 'moment';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatFormSharedModule } from '../../../../../../Shared/Modules/mat-form-shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { GetSellerOrders } from '../../../../../../Services/Orders/Queries/Models/GetSellerOrders';
import { OrderQueriesService } from '../../../../../../Services/Orders/Queries/Handler/order-queries.service';
import { DetailsComponent } from './details/details.component';
import { UpdateStatsOrder } from '../../../../../../Services/Orders/Commend/Models/UpdateStatsOrder';
import { OrderCommendService } from '../../../../../../Services/Orders/Commend/Handler/order-commend.service';
import { ConfirmStateDialogComponent } from '../../../../../../Shared/Components/confirm-state-dialog.component';
import { CancelOrderDialogComponent } from '../../../../../../Shared/Components/cancel-order-dialog.component';
@Component({
  selector: 'app-orders',
  imports: [
    NgxDatatableModule,
    CommonModule,
    FormsModule,
    MatFormSharedModule,
    NgxPaginationModule,
    MatDatepickerModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrdersComponent implements OnInit {
  //#region Faildes
  page = {
    limit: 10, // عدد الطلبات في كل صفحة
    pageNumber: 1, // الصفحة الحالية
    count: 0,
    offset: 0,
  };
  Orders: Array<GetSellerOrders> = [];
  SellerId = localStorage.getItem('sellerID');
  temp: any = [];
  filter: any = {};
  searchFilterid: any;

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date(this._currentYear + 1, 11, 31);
  Status = [
    { name: 'Pending 🕒', value: 0 },
    { name: 'Confirm 📦', value: 1 },
    { name: 'Shipped 🚚', value: 2 },
    { name: 'Delivered ✅', value: 3 },
    { name: 'Cancelled ❌', value: 4 },
  ];

  //#endregion

  //#region Injectors
  private readonly _OrderQueriesService = inject(OrderQueriesService);
  private readonly _OrderCommendService = inject(OrderCommendService);
  private readonly Toster = inject(ToastrService);
  readonly dialog = inject(MatDialog);
  //#endregion

  //#region LiveHooks
  ngOnInit(): void {
    this.GetOrders(this.page.pageNumber, this.page.limit, this.filter);
  }

  //#endregion

  //#region Methods

  GetOrders(page: number, limit: number, filter?: any) {
    if (this.SellerId) {
      this._OrderQueriesService
        .GetOrderSeller(page, limit, filter)
        .subscribe((res) => {
          this.Orders = res.data;
          this.temp = res.data;
          this.page.pageNumber = res.currentPage;
          this.page.count = res.totalCount;
          this.page.limit = res.pageSize;
        });
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    Order: GetSellerOrders
  ) {
    const dialogRef = this.dialog.open(DetailsComponent, {
      width: '800px',

      enterAnimationDuration,
      exitAnimationDuration,
      data: Order,
    });
  }

  onStatusChange(event: Event, order: any) {
    const select = event.target as HTMLSelectElement;
    const newState = select.value;
    this.changeOrderState(order, newState);
  }

  async changeOrderState(order: any, newState: string) {
    if (newState === '4') {
      const dialogRef = this.dialog.open(CancelOrderDialogComponent, {
        width: '400px',
      });
      const result = await dialogRef.afterClosed().toPromise();
      if (!result) {
        return;
      }
      this.updateOrderStatus(order, newState, result);
    } else {
      const dialogRef = this.dialog.open(ConfirmStateDialogComponent, {
        width: '400px',
        data: { newStatus: this.getStatus(Number(newState)) },
      });

      const result = await dialogRef.afterClosed().toPromise();
      if (!result) {
        return;
      }

      this.updateOrderStatus(order, newState);
    }
  }

  private updateOrderStatus(
    order: any,
    newState: string,
    cancellationReason?: string
  ) {
    const request: UpdateStatsOrder = {
      productID: order.product.id,
      orderId: order.orderID,
      status: Number(newState),
      cancellationReason: cancellationReason,
    };

    this._OrderCommendService.UpdateOrderStatus(request).subscribe((res) => {
      if (res.success) {
        order.status = Number(newState);
        this.Toster.success('Order status updated successfully');
      } else {
        this.Toster.error('Error updating order status');
      }
    });
  }

  getStatusClass(status: number) {
    return (
      {
        0: 'status-pending',
        1: 'status-confirm',
        2: 'status-shipped',
        3: 'status-delivered',
        4: 'status-cancelled',
      }[status] || 'unknown-status'
    );
  }
  getStatus(status: number) {
    const statuses = [
      'Pending',
      'Confirm',
      'Shipped',
      'Delivered',
      'Cancelled',
    ];
    return statuses[status] ?? ''; // استخدام مصفوفة بدلاً من `switch` لجعل الكود أنظف
  }

  onPageChange(event: any) {
    this.page.offset = event.offset;
    this.page.pageNumber = event.offset + 1;
    this.GetOrders(this.page.pageNumber, this.page.limit, this.filter);
  }

  // دالة تغيير الصفحة
  // onPageSizeChange(event: any) {
  //   this.page.limit = event.target.value;
  //   this.page.pageNumber = 1; // إعادة التهيئة للصفحة الأولى
  //   this.GetOrders(this.page.pageNumber, this.page.limit);
  // }
  //#endregion

  //#region Filters
  search(event: any) {
    this.filter['SearchTearm'] = event.value;
    this.page.pageNumber = 1;
    clearTimeout(this.searchFilterid);
    this.searchFilterid = setTimeout(() => {
      this.GetOrders(this.page.pageNumber, this.page.limit, this.filter);
    }, 1000);
  }

  SelectStatus(event: any) {
    this.filter['Status'] = event.value;
    this.page.pageNumber = 1;
    this.GetOrders(this.page.pageNumber, this.page.limit, this.filter);
  }
  SelectDate(event: any, type: string) {
    this.filter[type] = moment(event.value).format('MM-DD-YYYY');
    this.page.pageNumber = 1;
    if (type == 'toDate' && this.filter['toDate'] !== 'Invalid date') {
      this.GetOrders(this.page.pageNumber, this.page.limit, this.filter);
    }
  }

  //#endregion
}
