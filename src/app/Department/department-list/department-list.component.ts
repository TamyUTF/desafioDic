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
import { DialogueConfirmComponent } from 'src/app/shared/dialogue-confirm/dialogue-confirm.component';
import { Util } from 'src/app/shared/util';
import { FormDepartmentProcessComponent } from 'src/app/shared/form-department-process/form-department-process.component';
import { ProcessComponent } from 'src/app/Process/process/process.component';
import { UserViewComponent } from 'src/app/User/user-view/user-view.component';

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
              private authService: AuthService,
              private snackbar: Util) {
    this.verifyUser();
    this.verifyServices();
  }
  user: User;
  clickButton = false;
  subs: Subscription;
  search: string;
  filterBy = 'all';
  searching = false;
  processFilter$: any;
  involvedFilter$: any;

  verifyUser() {
    if (this.authService.isAuthenticated) {
      this.userEventService.getUser();
      this.subs = this.userEventService.userEvent.subscribe(res => this.user = res);
    }
  }

  verifyServices() {
    if (!this.departmentService.departments$) {
      this.departmentService.list();
    }
    if (!this.processService.processes$) {
      this.processService.list();
    }
  }

  getElements(e) {
    if (this.filterBy === 'process') {
      this.processFilter$ = this.processService.getAll();
    } else if (this.filterBy === 'involved') {
      this.involvedFilter$ = this.userService.getAll();
    }
  }
  viewUser(userView) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '700px';
    dialogConfig.minHeight = '350px';
    dialogConfig.data = {
      user: userView
    };
    this.modal.open(UserViewComponent, dialogConfig);
  }

  viewDepartment(departmentView) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '850px';
    dialogConfig.minHeight = '350px';
    dialogConfig.data = {
      user: this.user,
      department: departmentView
    };
    this.modal.open(DepartmentComponent, dialogConfig);
  }

  searchFor(search) {
    if (this.filterBy === 'process') {
      this.processService.getAll().subscribe(process => {
        this.processFilter$ = process.filter(res => res.name.ToLowerCase().Contains(search.ToLowerCase()));
      });
    } else if (this.filterBy === 'involved') {
      this.userService.getAll().subscribe(
        involved => {
          this.involvedFilter$ = involved.filter(res => res.name == search);
          console.log(this.involvedFilter$);
        }
      );
    }
  }

  deleteDepartment(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      msg: 'Deseja excluir este empreedimento?'
    };
    const dialogRef = this.modal.open(DialogueConfirmComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.departmentService.delete(id).subscribe(
          res => {
            this.snackbar.openSnackBar('Departamento excluído com sucesso.', 'Ok!');
            this.departmentService.list();
          },
          error => console.error(error)
        );
      }
    });
  }

  editDepartment(departmentEdit) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '450px';
    dialogConfig.minHeight = '250px';
    dialogConfig.data = {
      type: 'department',
      edit: true,
      department: departmentEdit
    };
    this.modal.open(FormDepartmentProcessComponent, dialogConfig);
  }

  addProcess(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '450px';
    dialogConfig.minHeight = '250px';
    dialogConfig.data = {
      type: 'process',
      departmentId: id,
      edit: false
    };
    this.modal.open(FormDepartmentProcessComponent, dialogConfig);
  }

  addDepartment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '450px';
    dialogConfig.minHeight = '250px';
    dialogConfig.data = {
      type: 'department',
      edit: false
    };
    this.modal.open(FormDepartmentProcessComponent, dialogConfig);
  }

  viewProcess(processView) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '850px';
    dialogConfig.minHeight = '350px';
    dialogConfig.data = {
      user: this.user,
      process: processView
    };
    this.modal.open(ProcessComponent, dialogConfig);
  }

  editProcess(processEdit) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '450px';
    dialogConfig.minHeight = '250px';
    dialogConfig.data = {
      type: 'process',
      edit: true,
      process: processEdit
    };
    this.modal.open(FormDepartmentProcessComponent, dialogConfig);
  }

  deleteProcess(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      msg: 'Deseja excluir este processo?'
    };
    const dialogRef = this.modal.open(DialogueConfirmComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.processService.delete(id).subscribe(
          res => {
            this.snackbar.openSnackBar('Processo excluído com sucesso.', 'Ok!');
            this.processService.list();
          },
          error => console.error(error)
        );
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
