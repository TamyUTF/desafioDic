import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { AuthService } from './../../core/auth.service';

import { DepartmentService } from '../Shared/department.service';
import { User } from 'src/app/User/Shared/user.model';
import { UserEventService } from './../../User/Shared/user-event.service';
import { UserService } from './../../User/Shared/user.service';
import { ProcessService } from 'src/app/Process/Shared/process.service';
import { DepartmentComponent } from '../department/department.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit, OnDestroy {

  constructor(private modal: MatDialog,
              private departmentService: DepartmentService,
              private processService: ProcessService,
              private userService: UserService,
              private userEventService: UserEventService,
              private authService: AuthService) {
    this.departmentService.list();
    this.processService.list();
    this.userService.list();
    this.verifyUser();
  }
  user: User;
  clickButton = false;
  subs: Subscription;

  verifyUser() {
    if (this.authService.isAuthenticated) {
      this.userEventService.getUser();
      this.subs = this.userEventService.userEvent.subscribe(res => this.user = res);
    }
  }
  view(departmentView) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '700px';
    dialogConfig.minHeight = '300px';
    dialogConfig.data = {
      user: this.user,
      department: departmentView
    };
    this.modal.open(DepartmentComponent, dialogConfig);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
