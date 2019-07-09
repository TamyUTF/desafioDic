import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AuthguardService } from './core/authguard.service';

import { DepartmentListComponent } from './Department/department-list/department-list.component';
import { DicListComponent } from './Dics/dic-list/dic-list.component';
import { LoginComponent } from './Login/login.component';
import { UserListComponent } from './User/user-list/user-list.component';
import { OverviewComponent } from './Overview/overview/overview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dics',
    component: DicListComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'departments',
    component: DepartmentListComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthguardService]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
