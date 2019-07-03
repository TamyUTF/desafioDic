import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { ProcessViewComponent } from './Process/process-view/process-view.component';
import { PeriodFormComponent } from './Period/period-form/period-form.component';

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
    ProcessViewComponent,
    PeriodFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DicModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthguardService,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
  },
  {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService],
  bootstrap: [AppComponent],
  entryComponents: [
    UserViewComponent,
    UserFormComponent,
    FormDepartmentProcessComponent
  ]
})
export class AppModule { }
