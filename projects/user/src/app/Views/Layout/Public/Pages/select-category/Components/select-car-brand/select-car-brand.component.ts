import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CarBrandQueriesService } from '../../../../../../../Services/Car/Queries/Handler/car-brand-queries.service';
import { GetCarBrandModel } from '../../../../../../../Services/Car/Queries/Models/GetCarBrandModel';
import { NavigationService } from '../../../../../../../Services/Navigation/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryDto } from '../../../../../../../Core/Dtos/CategoryDto';
import { Routing } from '../../../../../../../Meta/Routing';
import { SharedModuleModule } from '../../../../../../../Shared/Modules/shared-module.module';
import { BrandCarComponent } from '../../../home/brand-car/brand-car.component';
import { ProductCardsComponent } from '../../../home/ProductCards/product-cards.component';

@Component({
  selector: 'app-select-car-brand',
  imports: [SharedModuleModule],
  templateUrl: './select-car-brand.component.html',
  styleUrl: './select-car-brand.component.css',
})
export class SelectCarBrandComponent {
  carBrands: GetCarBrandModel[] = [];
  categoryId!: CategoryDto;
  IP: string = Routing.Ip;

  private readonly route = inject(ActivatedRoute); // Inject the route
  private readonly _carBrandQuereisService = inject(CarBrandQueriesService);
  private readonly Navigation = inject(NavigationService);
  ngOnInit(): void {
    this.route.parent?.data.subscribe((data) => {
      this.categoryId = data['CategoryId'];
      console.log(this.categoryId);
    });
    this._carBrandQuereisService
      .GeTCarBrandsWithPagination(1, 50)
      .subscribe((res) => (this.carBrands = res.data));
  }

  selectBrand(brandId: string) {
    if (this.categoryId) {
      this.Navigation.NavigationByUrl(
        `Public/Selector/${this.categoryId.id}/Brands/${brandId}/Models`
      );
    }
  }
}
