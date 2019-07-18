import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { GoogleChartsModule } from 'angular-google-charts';

import { DepartmentRoutingModule } from './Shared/department.routing.module';
import { DepartmentComponent } from './department/department.component';
import { DepartmentListComponent } from './department-list/department-list.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    DepartmentRoutingModule,
    GoogleChartsModule
  ],
  declarations: [
    DepartmentComponent,
    DepartmentListComponent
  ],
  exports : [
    DepartmentComponent
  ]
})
export class DepartmentModule { }
