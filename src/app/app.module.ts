import { PeriodModule } from './Period/period.module';
import { ProcessModule } from './Process/process.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';

import { AuthService } from './core/auth.service';
import { AuthguardService } from './core/authguard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { JwtInterceptorService } from './core/jwt.interceptor.service';
import { OverviewComponent } from './Overview/overview/overview.component';
import { DatePipe } from '@angular/common';
import { DicModule } from './Dics/dics.module';
import { UserModule } from './User/user.module';
import { DepartmentModule } from './Department/department.module';
import { ConfigurationModule } from './Configurations/Shared/configuration.module';
import { LoginModule } from './Login/login.module';
import { UtilModule } from './shared/util.module';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ConfigurationModule,
    DepartmentModule,
    DicModule,
    UserModule,
    LoginModule,
    PeriodModule,
    ProcessModule,
    UtilModule,
    HttpClientModule,
    GoogleChartsModule
  ],
  providers: [
    AuthService,
    AuthguardService,
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
  ]
})
export class AppModule { }
