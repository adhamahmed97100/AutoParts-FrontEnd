import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { GetCategoryModel } from '../../../../../../Services/Category/Queries/Models/GetCategoryModel';
import { GetCarBrandModel } from '../../../../../../Services/Car/Queries/Models/GetCarBrandModel';
import { MatFormSharedModule } from '../../../../../../Shared/Modules/mat-form-shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModelQuereisService } from '../../../../../../Services/Models/Quereis/Handler/model-quereis.service';
import { GetModelWithBrand } from '../../../../../../Services/Models/Quereis/Models/GetModelWithBrand';
import { NavigationService } from '../../../../../../Services/Navigation/navigation.service';
import { Routing } from '../../../../../../Meta/Routing';
import { SharedModuleModule } from '../../../../../../Shared/Modules/shared-module.module';
@Component({
  selector: 'app-slider-adv',
  templateUrl: './slider-adv.component.html',
  styleUrls: ['./slider-adv.component.css'],
  standalone: true,
  imports: [SharedModuleModule, MatFormSharedModule, NgSelectModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderAdvComponent implements OnChanges {
  @Input() Categorys: GetCategoryModel[] = [];
  @Input() CarBrands: GetCarBrandModel[] = [];
  selectedBrand: any;
  selectedModel: any;
  selectedCategory: any;
  Ip = Routing.Ip;

  private readonly _ModelQuereisService = inject(ModelQuereisService);
  private readonly _Navigation = inject(NavigationService);

  Models: GetModelWithBrand[] = [];

  imagePaths: string[] = [
    'Adv/cmHJM20106.webp',
    'Adv/dCcwq23810.webp',
    'Adv/IWS8520206.webp',
    'Adv/JJQe029208.webp',
    'Adv/OxOlt20806.webp',
    'Adv/T5cVg20506.webp',
    'Adv/tpQ9F20706.webp',
    'Adv/UPYfU20206.webp',
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['Categorys']) {
      console.log('Updated Categories:', this.Categorys);
    }
    if (changes['CarBrands']) {
      console.log('Updated Car Brands:', this.CarBrands);
    }
  }
  GetModelsWithBrands(event: any) {
    this._ModelQuereisService.GetModelsWithBarnd(event.id).subscribe((res) => {
      this.Models = res.data;
      this.Models = this.Models.map((model) => ({
        ...model,
        displayName: `${model.name}  (${model.minYear} -- ${model.maxYear})`,
      }));
    });
  }
  Search() {
    this._Navigation.NavigationByUrl(
      `Public/Selector/${this.selectedCategory}/Brands/${this.selectedBrand}/Models/${this.selectedModel}`
    );
  }
  SelectCategory(even: any) {
    this.selectedCategory = even.categoryID;
  }
  getModelLabel(model: any): string {
    return `${model.name} (${model.minYear}-${model.maxYear})`;
  }
}
