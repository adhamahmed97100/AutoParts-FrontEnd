import { Component, inject, Input } from '@angular/core';
import { ProductQuereisService } from '../../../../../../Services/Product/Queries/Handler/product-quereis.service';
import { GetProductRatingStatisticsModels } from '../../../../../../Services/Product/Queries/Models/GetProductRatingStatisticsModels';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-rates',
  imports: [CommonModule],
  templateUrl: './products-rates.component.html',
  styleUrl: './products-rates.component.css',
})
export class ProductsRatesComponent {
  @Input() ProductId: string = '';
  reviews: GetProductRatingStatisticsModels = {
    namberReviews: 0,
    averageRating: 0,
    percentages: {},
  };

  isPopupVisible = false;

  //#endregion

  //#region Injector
  private readonly ProductQueries = inject(ProductQuereisService);
  //#endregion

  //#region LiveHook
  ngOnInit(): void {
    this.ProductQueries.GetProductRatingStatistics(this.ProductId).subscribe(
      (res) => {
        this.reviews = res.data;
      }
    );
  }
  //#endregion

  //#region Method
  fullStars(rate: number) {
    return Math.floor(rate);
  }
  showPopup() {
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false;
  }

  //#endregion
}
