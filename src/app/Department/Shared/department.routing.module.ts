import { DepartmentComponent } from '../department/department.component';
import { RouterModule, CanActivateChild } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthguardService } from 'src/app/core/authguard.service';
import { DepartmentListComponent } from './../department-list/department-list.component';

const appRoutes = [
    {path: 'departments', component: DepartmentListComponent,
      canActivateChild: [AuthguardService],
      children: [
        {path: ':id/edit', component: DepartmentComponent},
        {path: ':id', component: DepartmentComponent}
      ]}
];

@NgModule ({
    imports: [ RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
  })

export class DepartmentRoutingModule { }
