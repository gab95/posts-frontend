import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CheckLoginGuard } from './shared/guard/check-login.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { AdminGuard } from './shared/guard/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [CheckLoginGuard],
  },

  {
    path: 'home',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'admin',
    canLoad: [AuthGuard],
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },

  {
    path: 'notFound',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
