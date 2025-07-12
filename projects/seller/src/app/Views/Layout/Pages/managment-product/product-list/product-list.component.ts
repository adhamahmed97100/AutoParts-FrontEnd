import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatFormSharedModule } from '../../../../../Shared/Modules/mat-form-shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GetSellerProductsModel } from '../../../../../Services/Product/Queries/Models/GetSellerProductsModel';
import { MatDialog } from '@angular/material/dialog';
import { ProductQuereisService } from '../../../../../Services/Product/Queries/Handler/product-quereis.service';
import { Routing } from '../../../../../Meta/Routing';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ProductImagesDto } from '../../../../../Core/Dtos/ProductImagesDto';
import { Observable } from 'rxjs';
import { Response } from '../../../../../Core/BasicResponse/Response';
import { ProductCommendService } from '../../../../../Services/Product/Commend/Handler/product-commend.service';
import { ConfirmDialogComponent } from '../../../../../Shared/Components/confirm-dialog/confirm-dialog.component';
import { NavigationService } from '../../../../../Services/Navigation/navigation.service';

@Component({
  selector: 'app-product-list',
  imports: [
    NgxDatatableModule,
    CommonModule,
    FormsModule,
    MatFormSharedModule,
    NgxPaginationModule,
    MatDatepickerModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductListComponent {
  searchFilterid: any;
  filter: any = {};
  Ip: string = Routing.Ip;
  page = {
    limit: 5, // عدد الطلبات في كل صفحة
    pageNumber: 1,
    count: 0,
    offset: 0,
  };
  viewDetails: boolean = false;
  selectedProduct: GetSellerProductsModel | null = null;
  readonly dialog = inject(MatDialog);
  private readonly _ProductQuereisService = inject(ProductQuereisService);
  private readonly _ProductCommendService = inject(ProductCommendService);
  private readonly _NavigationService = inject(NavigationService);
  products: Array<GetSellerProductsModel> = [];
  SellerId = localStorage.getItem('sellerID');

  getProduct(PageNumber: number, PageSize: number, filter?: object) {
    if (this.SellerId) {
      this._ProductQuereisService
        .getSellerProduct(PageNumber, PageSize, filter)
        .subscribe((res) => {
          this.products = res.data;
          this.page.pageNumber = res.currentPage;
          this.page.count = res.totalCount;
          this.page.limit = res.pageSize;
        });
    }
  }
  editProduct(product: any): void {
    console.log('Editing product:', product);
  }
  onPageChange(event: any) {
    this.page.pageNumber = event.offset + 1;
    this.getProduct(this.page.pageNumber, this.page.limit);
  }

  DeleteProduct(product: GetSellerProductsModel): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Delete Product',
        message: `Are you sure you want to delete "${product.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._ProductCommendService
          .DeleteProduct(product.id)
          .subscribe((res) => {
            if (res.success) {
              this.getProduct(this.page.pageNumber, this.page.limit);
            }
          });
      }
    });
  }

  viewProductDetails(model: GetSellerProductsModel): void {
    this._NavigationService.NavigationByUrl(
      'Security/ManagmentProduct/EditProduct/' + model.id
    );
  }

  backword(event: any): void {
    this.viewDetails = false;
  }

  Search(event: any) {
    this.filter['searchTerm'] = event.value;
    this.page.pageNumber = 1;
    clearTimeout(this.searchFilterid);
    this.searchFilterid = setTimeout(() => {
      this.getProduct(this.page.pageNumber, this.page.limit, this.filter);
    }, 1000);
  }
}
