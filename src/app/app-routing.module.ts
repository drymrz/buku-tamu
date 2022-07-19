import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ChildGuardGuard } from './guard/child-guard.guard';
import { FormGuard } from './guard/form.guard';
import { FormLayoutComponent } from './layouts/form-layout/form-layout.component';
import { FormResultComponent } from './shared/form-result/form-result.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    canActivateChild: [ChildGuardGuard],
    loadChildren: () =>
      import('src/app/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('src/app/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'form',
    component: FormLayoutComponent,
    // canActivate: [FormGuard],
  },
  {
    path: 'form/result',
    component: FormResultComponent,
    // canActivate: [FormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
