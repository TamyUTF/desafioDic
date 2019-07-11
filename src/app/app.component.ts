import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from './core/auth.service';
import { User } from './User/Shared/user.model';
import { UserEventService } from './User/Shared/user-event.service';
import { UserViewComponent } from './User/user-view/user-view.component';
import { UserFormComponent } from './User/user-form/user-form.component';
import { PeriodFormComponent } from './Period/period-form/period-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService,
              private userEventService: UserEventService,
              private modal: MatDialog,
              private router: Router) {
    this.open();
  }

  title = 'DesafioDic';
  opened = false;
  isLogged = false;
  user: User;

  open() {
    if (this.auth.isAuthenticated) {
      this.isLogged = true;
      this.userEventService.userEvent.subscribe(res => this.user = res);
    }
    this.isLogged = false;
  }

  userMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '700px';
    dialogConfig.minHeight = '350px';
    dialogConfig.data = {
      user: this.user
    };
    this.modal.open(UserViewComponent, dialogConfig);
  }

  viewUserdic() {

  }

  registerPeriod() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '550px';
    dialogConfig.minHeight = '350px';
    dialogConfig.data = {
      type: 'new'
    };
    this.modal.open(PeriodFormComponent, dialogConfig);
  }

  registerUser() {
    // this.router.navigateByUrl('/users/new');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '700px';
    dialogConfig.minHeight = '300px';
    this.modal.open(UserFormComponent, dialogConfig);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }

}
