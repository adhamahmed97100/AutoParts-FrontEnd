import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'Public',
        loadChildren: () =>
          import('./Public/public.module').then((c) => c.PublicModule),
      },
      {
        path: 'Security',
        loadChildren: () =>
          import('./security/security.module').then((c) => c.SecurityModule),
      },
      { path: '', redirectTo: 'Public', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
