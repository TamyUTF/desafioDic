import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';

import { AuthService } from './core/auth.service';
import { AuthguardService } from './core/authguard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import { LoginService } from './Login/shared/login.service';
import { DepartmentListComponent } from './Department/department-list/department-list.component';
import { ProcessListComponent } from './Process/process-list/process-list.component';
import { DicModule } from './Dics/dics.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { JwtInterceptorService } from './core/jwt.interceptor.service';
import { UserViewComponent } from './User/user-view/user-view.component';
import { UserFormComponent } from './User/user-form/user-form.component';
import { UserListComponent } from './User/user-list/user-list.component';
import { FormDepartmentProcessComponent } from './shared/form-department-process/form-department-process.component';
import { DepartmentComponent } from './Department/department/department.component';
import { PeriodFormComponent } from './Period/period-form/period-form.component';
import { DialogueConfirmComponent } from './shared/dialogue-confirm/dialogue-confirm.component';
import { ProcessComponent } from './Process/process/process.component';
import { OverviewComponent } from './Overview/overview/overview.component';
import { DialogueInputComponent } from './shared/dialogue-input/dialogue-input.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DepartmentListComponent,
    ProcessListComponent,
    UserViewComponent,
    UserFormComponent,
    UserListComponent,
    FormDepartmentProcessComponent,
    DepartmentComponent,
    ProcessComponent,
    PeriodFormComponent,
    DialogueConfirmComponent,
    OverviewComponent,
    DialogueInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DicModule,
    HttpClientModule,
    GoogleChartsModule
  ],
  providers: [
    AuthService,
    AuthguardService,
    LoginService,
    JwtHelperService,
    DatePipe,
    {
      provide: MatDialogRef, useValue: {} },
    {
      provide: MAT_DIALOG_DATA, useValue: [] },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
  },
  {
    provide: JWT_OPTIONS, useValue: JWT_OPTIONS}
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    UserViewComponent,
    UserFormComponent,
    FormDepartmentProcessComponent,
    DepartmentComponent,
    DialogueConfirmComponent,
    ProcessComponent,
    DialogueInputComponent,
    PeriodFormComponent
  ]
})
export class AppModule { }
