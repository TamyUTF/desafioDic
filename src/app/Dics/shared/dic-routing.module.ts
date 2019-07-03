import { AuthguardService } from './../../core/authguard.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DicsComponent } from '../dic/dics.component';
import { DicListComponent } from '../dic-list/dic-list.component';
import { DicFormComponent } from '../dic-form/dic-form.component';

const appRoutes = [
    {path: 'dics', component: DicListComponent,
      canActivateChild: [AuthguardService],
      children: [
      {path: ':id/edit', component: DicsComponent},
      {path: ':id', component: DicsComponent},
      {path: '?status=:result', component: DicListComponent},
      {path: '?user=:result', component: DicListComponent},
      {path: '?department=:result', component: DicListComponent},
      {path: '?process=:result', component: DicListComponent},
      {path: '?late=:result', component: DicListComponent},
      {path: 'new', component: DicFormComponent}
    ]}
];

@NgModule ({
    imports: [ RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
  })

export class DicRoutingModule { }
