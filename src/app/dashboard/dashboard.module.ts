import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ImportAllNZModule } from '../nz-declaration.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainTableComponent } from './table-kunjungan/main-table.component';
import { DetailKunjunganComponent } from './detail-kunjungan/detail-kunjungan.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { TableUserComponent } from './table-user/user-table.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { NewUserComponent } from './new-user/new-user.component';

@NgModule({
  declarations: [
    MainTableComponent,
    DetailKunjunganComponent,
    HomeDashboardComponent,
    TableUserComponent,
    DetailUserComponent,
    NewUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ImportAllNZModule,
  ],
})
export class DashboardModule {}
