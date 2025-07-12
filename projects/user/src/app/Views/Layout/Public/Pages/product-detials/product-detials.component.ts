import { GetProductById } from './../../../../../Services/Product/Queries/Models/GetProductById';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRatingComponent } from './product-rating/product-rating.component';

import { QueriesProductService } from '../../../../../Services/Product/Queries/Handler/queries-product.service';
import { ActivatedRoute } from '@angular/router';
import { Routing } from '../../../../../Meta/Routing';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../../../../Services/SharedDataService/shared-data.service';
import { NavigationService } from '../../../../../Services/Navigation/navigation.service';
import { CartService } from '../../../../../Services/Cart/Handler/cart.service';
import { catchError, Observable, tap } from 'rxjs';
import { RatingQueryService } from '../../../../../Services/Rating/Queries/Handler/rating-query.service';
import { ReviewStatistic } from '../../../../../Services/Rating/Queries/Model/ReviewStatistic';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScrollService } from '../../../../../Services/scroll.service';
import { ProductImagesDto } from '../../../../../Core/Dtos/ProductImagesDto';
import { SharedModuleModule } from '../../../../../Shared/Modules/shared-module.module';

@Component({
  selector: 'app-product-detials',
  imports: [
    CommonModule,
    ProductRatingComponent,
    NgxPaginationModule,
    SharedModuleModule,
  ],
  templateUrl: './product-detials.component.html',
  styleUrl: './product-detials.component.css',
})
export class ProductDetialsComponent implements OnInit {
  //#region  Failds
  product: GetProductById = {} as GetProductById;
  Ip = Routing.Ip;
  userId = localStorage.getItem('userId');
  selectedImage: string = '';
  filter: any = {};
  MainImage: string = '';
  pageSize = 5;
  p = 1;
  total: number = 0;
  //#endregion

  //#region Injectors
  private readonly _CardService = inject(CartService);
  private readonly _totservice = inject(ToastrService);
  private readonly _RateService = inject(RatingQueryService);
  private readonly _sharedDataService = inject(SharedDataService);
  private readonly _NavigationBar = inject(NavigationService);
  private readonly route = inject(ActivatedRoute);
  private scrollService = inject(ScrollService);
  isLoaded = false;
  //#endregion

  //#region LiveHooke
  ngOnInit(): void {
    this.route.data.subscribe(({ ProductId }) => {
      this.product = ProductId;
      this.filter['ProductId'] = this.product.productID;
      this.product.description = this.product.description
        .replace(/,/g, '<br>')
        .replace(/\./g, '<br>');
      this.MainImage =
        this.product.images.find((img) => img.image.startsWith('main_'))
          ?.image ?? this.product.images[0].image;

      this.GetReviewPaginagtion(this.p, this.pageSize, this.filter);
    });
    setTimeout(() => {
      this.scrollService.smoothScroll(1000);
    }, 100);
  }
  //#endregion

  //#region Method

  getMainImage(images: ProductImagesDto[]): string | null {
    if (!images || images.length === 0) return null;
    const main = images.find((img) => img.image.startsWith('main_'));
    return main?.image ?? images[0].image;
  }
  GetReviewPaginagtion(p: number, pageSize: number, filter: object) {
    this._RateService
      .getSellerProductReviews(p, pageSize, filter)
      .subscribe((res) => {
        this.product.reviewDto = res.data;
        this.total = res.totalCount;
      });
  }
  changeImage(event: Event, newSrc: string) {
    this.selectedImage = newSrc;
  }
  fullStars(rate: number) {
    return Math.floor(rate);
  }

  OrderNow(quantity: number) {
    this.AddToCard(quantity).subscribe({
      next: (res) => {
        if (res.success) {
          this._NavigationBar.NavigationByUrl('Security/Cart');
        }
      },
      error: (err) => {
        this._totservice.error('Error while adding product to cart');
      },
    });
  }

  AddToCard(quantity: number): Observable<any> {
    if (!this.userId) {
      this._NavigationBar.NavigationByUrl('Auth');
      return new Observable();
    }

    return this._CardService
      .addToCart({
        productID: this.product.productID,
        quantity: quantity,
        userId: this.userId,
      })
      .pipe(
        tap((res) => {
          if (res.success) {
            this._totservice.success('Success Add Product In Cart');
            this._sharedDataService.updateCartCount(1);
          }
        }),
        catchError((err) => {
          this._totservice.warning(
            err?.error?.message || 'Something went wrong'
          );
          return new Observable(); // نرجع Observable فاضي عشان مانكسرش السلسلة
        })
      );
  }
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'Loding.svg';
    this.isLoaded = true;
  }

  onImageLoad() {
    this.isLoaded = true;
  }

  pageChanged(event: number) {
    this.p = event;
    this.GetReviewPaginagtion(this.p, this.pageSize, this.filter);

    // const element = document.getElementById('products-container');
    // if (element) {
    //   this.smoothScrollTo(element.getBoundingClientRect().top - 70);
    // }
  }
  //#endregion
}
