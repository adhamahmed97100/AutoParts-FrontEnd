import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Views/Layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'Auth',
    loadChildren: () =>
      import('./Views/Auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: 'Public', pathMatch: 'full' },
];
