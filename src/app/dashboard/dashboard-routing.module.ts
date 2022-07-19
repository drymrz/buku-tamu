import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { ChildGuardGuard } from '../guard/child-guard.guard';
import { DashboardLayoutComponent } from '../layouts/dashboard-layout/dashboard-layout.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { DetailKunjunganComponent } from './detail-kunjungan/detail-kunjungan.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { MainTableComponent } from './table-kunjungan/main-table.component';
import { NewUserComponent } from './new-user/new-user.component';
import { TableUserComponent } from './table-user/user-table.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeDashboardComponent,
      },
      {
        path: 'kunjungan/table',
        component: MainTableComponent,
      },
      {
        path: 'kunjungan/detail/:id',
        component: DetailKunjunganComponent,
      },
      {
        path: 'user/table',
        component: TableUserComponent,
      },
      {
        path: 'user/detail/:id',
        component: DetailUserComponent,
      },
      {
        path: 'user/form',
        component: NewUserComponent,
      },
      {
        path: '**',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
