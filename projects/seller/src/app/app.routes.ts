import { Routes } from '@angular/router';
import { authGuard } from './Guard/auth.guard';

export const routes: Routes = [
  {
    path: 'Security',
    loadChildren: () =>
      import('./Views/Layout/layout.module').then((m) => m.LayoutModule),
    canMatch: [authGuard],
  },
  {
    path: 'Auth',
    loadChildren: () =>
      import('./Views/Auth/auth.module').then((m) => m.AuthModule),
  },

  { path: '**', redirectTo: 'Security', pathMatch: 'full' },
];
