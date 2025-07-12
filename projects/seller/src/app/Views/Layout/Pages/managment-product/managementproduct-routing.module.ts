import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagmentProductComponent } from './managment-product.component';
import { getProductByIdResolver } from '../../../../Resolver/get-product-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: ManagmentProductComponent,
    children: [
      {
        path: 'Products',
        loadComponent: () =>
          import('./product-list/product-list.component').then(
            (c) => c.ProductListComponent
          ),
      },

      {
        path: 'EditProduct/:id',
        loadComponent: () =>
          import('./edit-product/edit-product.component').then(
            (c) => c.EditProductComponent
          ),
        resolve: { ProductId: getProductByIdResolver },
      },
      { path: '', redirectTo: 'Products', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementproductRoutingModule {}
