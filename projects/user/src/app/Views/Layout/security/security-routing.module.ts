import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { userCardResolver } from '../../../Resolver/user-card.resolver';
import { ProfileComponent } from './profile/profile.component';

import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { OrdersComponent } from './orders/orders.component';
import { userOrdersResolver } from '../../../Resolver/user-orders.resolver';
import { authGuard } from '../../../Guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    children: [
      {
        path: 'Cart',
        loadComponent: () =>
          import('./cart/cart.component').then((m) => m.CartComponent),
        resolve: { CardUser: userCardResolver },
        canMatch: [authGuard],
      },
      {
        path: 'Checkout',
        loadComponent: () =>
          import('./check-out/check-out.component').then(
            (m) => m.CheckOutComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.component').then((m) => m.ProfileComponent),
        canMatch: [authGuard],
        title: 'profile',
      },

      {
        path: 'orders',
        loadComponent: () =>
          import('./orders/orders.component').then((m) => m.OrdersComponent),
        resolve: { userOrders: userOrdersResolver },
        canMatch: [authGuard],
        title: 'orders',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
