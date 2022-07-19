import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ImportAllNZModule } from '../nz-declaration.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainTableComponent } from './main-table/main-table.component';
import { DetailTamuComponent } from './detail-tamu/detail-tamu.component';
import { DescTableComponent } from './desc-table/desc-table.component';
import { UserTableComponent } from './user-table/user-table.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { NewUserComponent } from './new-user/new-user.component';

@NgModule({
  declarations: [
    MainTableComponent,
    DetailTamuComponent,
    DescTableComponent,
    UserTableComponent,
    DetailUserComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ImportAllNZModule,
  ],
})
export class DashboardModule { }
