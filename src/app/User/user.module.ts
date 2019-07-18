import { UserListComponent } from './user-list/user-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';

import { UserViewComponent } from './user-view/user-view.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserRoutingModule } from './Shared/user-routing.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    UserRoutingModule,
    GoogleChartsModule
  ],
  declarations: [
    UserViewComponent,
    UserFormComponent,
    UserListComponent
  ],
  exports: [
    UserViewComponent
  ]
})
export class UserModule { }
