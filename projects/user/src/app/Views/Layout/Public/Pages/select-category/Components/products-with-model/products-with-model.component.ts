import { Component, inject, Input } from '@angular/core';
import { GetProducts } from '../../../../../../../Services/Product/Queries/Models/GetProducts';
import { Routing } from '../../../../../../../Meta/Routing';
import { QueriesProductService } from '../../../../../../../Services/Product/Queries/Handler/queries-product.service';
import { ToastrService } from 'ngx-toastr';
import { GetModelWithBrand } from '../../../../../../../Services/Models/Quereis/Models/GetModelWithBrand';
import { ActivatedRoute } from '@angular/router';
import { NotFoundComponent } from '../../../../../Components/not-found/not-found.component';
import { SharedModuleModule } from '../../../../../../../Shared/Modules/shared-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductCardsComponent } from '../../../home/ProductCards/product-cards.component';
@Component({
  selector: 'app-products-with-model',
  imports: [SharedModuleModule, NgxPaginationModule, ProductCardsComponent],
  templateUrl: './products-with-model.component.html',
  styleUrl: './products-with-model.component.css',
})
export class ProductsWithModelComponent {
  //#region  Fials
  model: GetModelWithBrand = {} as GetModelWithBrand;
  Products: Array<GetProducts> = new Array<GetProducts>();
  filter: object = {};

  Ip = Routing.Ip;

  //#endregion

  private readonly AcativeRoute = inject(ActivatedRoute);
  _ProductService = inject(QueriesProductService);
  _totservice = inject(ToastrService);
  categoryId!: string;
  brandId!: string;
  private readonly ActaveRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    this.AcativeRoute.data.subscribe(({ ModelById }) => {
      this.AcativeRoute.parent?.params.subscribe((perntparams) => {
        this.AcativeRoute.params.subscribe((params) => {
          this.brandId = params['brandId'] ?? perntparams['brandId'];
          this.categoryId = perntparams['id'] ?? params['CategoryId'];
          console.log(this.categoryId);
          this.model = ModelById;
          this.filter = {
            CategoryId: this.categoryId,
            ModelId: this.model.id,
            BrandId: this.brandId,
          };
        });
      });
    });
  }
}
