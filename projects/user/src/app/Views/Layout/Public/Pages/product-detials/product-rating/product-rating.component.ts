import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ReviewDto } from '../../../../../../Core/Dtos/ReviewDto';
import { PopupComponent } from './popup/popup.component';
import { ReviewStatistic } from '../../../../../../Services/Rating/Queries/Model/ReviewStatistic';
import { RatingQueryService } from '../../../../../../Services/Rating/Queries/Handler/rating-query.service';

@Component({
  selector: 'app-product-rating',
  imports: [CommonModule, PopupComponent],
  templateUrl: './product-rating.component.html',
  styleUrl: './product-rating.component.css',
})
export class ProductRatingComponent {
  //#region Failds
  @Input() Productid = '';
  averageRating: number = 0;
  isPopupVisible = false;
  reviews: ReviewStatistic = {
    namberReviews: 0,
    averageRating: 0,
    percentages: {},
  };

  //#endregion

  //#region Injector
  private readonly _RateService = inject(RatingQueryService);
  //#endregion

  //#region LiveHook
  ngOnInit(): void {
    this._RateService.GetReviewStatistic(this.Productid).subscribe((res) => {
      this.reviews = res.data;
    });
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
