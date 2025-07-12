import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { categoryResolver } from '../../../Resolver/category.resolver';
import { modelWithBrandResolver } from '../../../Resolver/model-with-brand.resolver';
import { modelByIdResolver } from '../../../Resolver/model-by-id.resolver';
import { getProductByIdResolver } from '../../../Resolver/get-product-by-id.resolver';
import { brandByIdResolver } from '../../../Resolver/brand-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'Home',
        loadComponent: () =>
          import('./Pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'Product/:id',
        loadComponent: () =>
          import('./Pages/product-detials/product-detials.component').then(
            (m) => m.ProductDetialsComponent
          ),
        resolve: { ProductId: getProductByIdResolver },
      },
      {
        path: 'Selector/:id',
        loadComponent: () =>
          import('./Pages/select-category/select-category.component').then(
            (m) => m.SelectCategoryComponent
          ),
        resolve: { CategoryId: categoryResolver },
        children: [
          {
            path: 'Brands',
            loadComponent: () =>
              import(
                './Pages/select-category/Components/select-car-brand/select-car-brand.component'
              ).then((m) => m.SelectCarBrandComponent),
          },
          {
            path: 'Brands/:brandId/Models',
            loadComponent: () =>
              import(
                './Pages/select-category/Components/models-component/models-component.component'
              ).then((m) => m.ModelsComponentComponent),
            resolve: { Models: modelWithBrandResolver },
          },
          {
            path: 'Brands/:brandId/Models/:modelId',
            loadComponent: () =>
              import(
                './Pages/select-category/Components/products-with-model/products-with-model.component'
              ).then((m) => m.ProductsWithModelComponent),
            resolve: { ModelById: modelByIdResolver },
          },
          { path: '', redirectTo: 'Brands', pathMatch: 'full' },
        ],
      },

      {
        path: 'Search/:text',
        loadComponent: () =>
          import('./Pages/search/search.component').then(
            (m) => m.SearchComponent
          ),
      },

      {
        path: 'SelectorBrand/:brandId',
        loadComponent: () =>
          import('./Pages/select-brand/select-brand.component').then(
            (m) => m.SelectBrandComponent
          ),
        resolve: { BrandById: brandByIdResolver },
        children: [
          {
            path: 'Categories',
            loadComponent: () =>
              import(
                './Pages/select-brand/Components/category/category.component'
              ).then((m) => m.CategoryComponent),
          },
          {
            path: 'Categories/:CategoryId/Models',
            loadComponent: () =>
              import(
                './Pages/select-brand/Components/models/models.component'
              ).then((m) => m.ModelsComponent),
            resolve: { CategoryId: categoryResolver },
          },
          {
            path: 'Categories/:CategoryId/Models/:modelId',
            loadComponent: () =>
              import(
                './Pages/select-category/Components/products-with-model/products-with-model.component'
              ).then((m) => m.ProductsWithModelComponent),
            resolve: { ModelById: modelByIdResolver },
          },
          { path: '', redirectTo: 'Categories', pathMatch: 'full' },
        ],
      },

      { path: '', redirectTo: 'Home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
