import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { getProductByIdResolver } from '../../Resolver/get-product-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'Dashboard',
        loadComponent: () =>
          import('./Pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'AddProduct',
        loadComponent: () =>
          import('./Pages/add-proudct/add-proudct.component').then(
            (c) => c.AddProudctComponent
          ),
      },

      {
        path: 'ManagmentProduct',
        loadChildren: () =>
          import('./Pages/managment-product/managementproduct.module').then(
            (m) => m.ManagementproductModule
          ),
      },
      {
        path: 'Analysis',
        loadComponent: () =>
          import('./Pages/analysis/analysis.component').then(
            (c) => c.AnalysisComponent
          ),
      },
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
