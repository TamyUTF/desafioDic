import { RouterModule } from '@angular/router';
import { NgModule} from '@angular/core';

import { AuthguardService } from 'src/app/core/authguard.service';

import { UserFormComponent } from './../user-form/user-form.component';
import { UserListComponent } from '../user-list/user-list.component';
import { UserViewComponent } from '../user-view/user-view.component';

const appRoutes = [
  {path: 'users', component: UserListComponent,
    canActivateChild: [AuthguardService],
    children: [
    {path: 'new', component: UserFormComponent},
    {path: ':id', component: UserViewComponent}
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
