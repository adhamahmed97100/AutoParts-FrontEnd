import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetProducts } from '../../../../../../Services/Product/Queries/Models/GetProducts';
import { Routing } from '../../../../../../Meta/Routing';
import { QueriesProductService } from '../../../../../../Services/Product/Queries/Handler/queries-product.service';
import { NotFoundComponent } from '../../../../Components/not-found/not-found.component';
import { SharedModuleModule } from '../../../../../../Shared/Modules/shared-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavigationService } from '../../../../../../Services/Navigation/navigation.service';
import { CartService } from '../../../../../../Services/Cart/Handler/cart.service';
import { AddIteamCart } from '../../../../../../Services/Cart/Models/AddToCart';
import { SharedDataService } from '../../../../../../Services/SharedDataService/shared-data.service';
import { ProductImagesDto } from '../../../../../../Core/Dtos/ProductImagesDto';
@Component({
  selector: 'app-product-cards',
  imports: [NotFoundComponent, SharedModuleModule, NgxPaginationModule],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.css',
})
export class ProductCardsComponent implements OnInit, OnChanges {
  Products: Array<GetProducts> = [];
  Ip = Routing.Ip;
  pageSize = 4;
  p = 1;
  total: number = 0;
  userId = localStorage.getItem('userId');
  @Input() filter: object = {};
  mainImage: ProductImagesDto = {} as ProductImagesDto;

  //cache
  private pageCache = new Map<number, GetProducts[]>();
  private _ProductService = inject(QueriesProductService);
  private _ShardedDataService = inject(SharedDataService);
  private readonly _CartServices = inject(CartService);
  private _totservice = inject(ToastrService);
  private readonly NavigationUrl = inject(NavigationService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.filter = changes['filter'].currentValue;
      this.pageCache.clear();
      this.p = 1;
      this.GetProductPagination(this.p, this.pageSize, this.filter);
    }
  }

  ngOnInit(): void {
    this.GetProductPagination(this.p, this.pageSize, this.filter);
  }

  AddToCart(productId: string) {
    let requset = {
      productID: productId,
      userId: this.userId,
      quantity: 1,
    } as AddIteamCart;
    this._CartServices.addToCart(requset).subscribe({
      next: (res) => {
        if (res.success) {
          this._totservice.success('Success Add Prouct In Cart');
          this._ShardedDataService.updateCartCount(1);
        }
      },
      error: (err) => {
        this._totservice.warning(err.error.message);
      },
    });
  }

  getMainImage(images: ProductImagesDto[]): string | null {
    if (!images || images.length === 0) return null;
    const main = images.find((img) => img.image.startsWith('main_'));
    return main?.image ?? images[0].image;
  }

  GetProductDetails(ProductId: string) {
    this.NavigationUrl.NavigationByUrl('Public/Product/' + ProductId);
  }

  GetProductPagination(
    PageNumber: number,
    PageSize: number,
    filter?: object
  ): void {
    if (this.pageCache.has(PageNumber)) {
      this.Products = this.pageCache.get(PageNumber)!;
      return;
    }
    this._ProductService
      .GetProuctsWihtPagination(PageNumber, PageSize, filter)
      .subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.Products = res.data;
            this.total = res.totalCount;
            this.pageCache.set(PageNumber, res.data);
          }
        },
        error: (err) => {
          this._totservice.error(err.message);
        },
      });
  }

  pageChanged(event: number) {
    this.p = event;
    this.GetProductPagination(this.p, this.pageSize, this.filter);

    const element = document.getElementById('products-container');
    if (element) {
      this.smoothScrollTo(element.getBoundingClientRect().top - 70);
    }
  }

  fullStars(rate: number) {
    return Math.floor(rate);
  }

  hasHalfStar(rate: number) {
    return rate % 1 !== 0;
  }

  emptyStars(rate: number) {
    return 5 - Math.floor(rate);
  }

  //#region  Scroll
  private smoothScrollTo(targetPosition: number, duration: number = 500) {
    const elementPosition = targetPosition;
    const offsetPosition = elementPosition + window.pageYOffset;

    // Smooth scroll with easing
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;

    let start: number | null = null;

    function animation(currentTime: number) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      const easeInOutCubic = (progress: number): number => {
        return progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      };

      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  //#endregion
}
