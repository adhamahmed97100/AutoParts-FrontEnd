import { Component, inject } from '@angular/core';
import { Routing } from '../../../../../../../Meta/Routing';
import { ActivatedRoute } from '@angular/router';
import { ModelQuereisService } from '../../../../../../../Services/Models/Quereis/Handler/model-quereis.service';
import { NavigationService } from '../../../../../../../Services/Navigation/navigation.service';
import { MakerBrandDto } from '../../../../../../../Core/Dtos/MakerBrandDto';
import { GetModelWithBrand } from '../../../../../../../Services/Models/Quereis/Models/GetModelWithBrand';

import { SharedModuleModule } from '../../../../../../../Shared/Modules/shared-module.module';
import { GetCategoryModel } from '../../../../../../../../../../seller/src/app/Services/Category/Queries/Models/GetCategoryModel';

@Component({
  selector: 'app-models',
  imports: [SharedModuleModule],
  templateUrl: './models.component.html',
  styleUrl: './models.component.css',
})
export class ModelsComponent {
  IP: string = Routing.Ip;
  Models: GetModelWithBrand[] = [];
  brandId: string = '';
  Category: any = '';
  private readonly route = inject(ActivatedRoute); // Inject the route
  private readonly _modelservices = inject(ModelQuereisService);
  private readonly Navigation = inject(NavigationService);
  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      this.brandId = params['brandId'];
      this._modelservices
        .GetModelsWithBarnd(this.brandId)
        .subscribe((res) => (this.Models = res.data));
    });
    this.route.params.subscribe((params) => {
      this.Category = params['CategoryId'];
      console.log(this.Category);
    });
  }

  selectModel(ModelId: string) {
    if (this.brandId) {
      this.Navigation.NavigationByUrl(
        `Public/SelectorBrand/${this.brandId}/Categories/${this.Category}/Models/${ModelId}`
      );
    }
  }
}
