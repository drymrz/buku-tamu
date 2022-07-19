import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { ChildGuardGuard } from '../guard/child-guard.guard';
import { DashboardLayoutComponent } from '../layouts/dashboard-layout/dashboard-layout.component';
import { DescTableComponent } from './desc-table/desc-table.component';
import { DetailTamuComponent } from './detail-tamu/detail-tamu.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { MainTableComponent } from './main-table/main-table.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserTableComponent } from './user-table/user-table.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'table',
        pathMatch: 'full',
      },
      {
        path: 'table',
        component: MainTableComponent,
      },
      {
        path: 'table/:id',
        component: DescTableComponent,
      },
      {
        path: 'detailTamu/:date/:id',
        component: DetailTamuComponent
      },
      {
        path: 'users/table',
        component: UserTableComponent
      },
      {
        path: 'detailUser/:id',
        component: DetailUserComponent
      },
      {
        path: 'users/new',
        component: NewUserComponent
      },
      {
        path: '**',
        redirectTo: 'table',
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
