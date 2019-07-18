import { UserEventService } from './../Shared/user-event.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormDepartmentProcessComponent } from '../../shared/form-department-process/form-department-process.component';
import { Util } from './../../shared/util';
import { UserService } from './../Shared/user.service';
import { DepartmentService } from 'src/app/Department/Shared/department.service';
import { ProcessService } from 'src/app/Process/Shared/process.service';
import { User, UserApi } from '../Shared/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<UserFormComponent>,
              private location: Location,
              private router: Router,
              private fBuilder: FormBuilder,
              private modal: MatDialog,
              private departmentService: DepartmentService,
              private processService: ProcessService,
              private userService: UserService,
              private userEventService: UserEventService,
              private snackBar: Util) {
    this.verifyServices();
    this.verifyUser();
    this.createForm();
  }
  form: FormGroup;
  subs: Subscription;
  user: User;
  invalidPassword = false;

  verifyUser() {
    this.userEventService.getUser();
    this.subs =  this.userEventService.userEvent.subscribe(res => this.user = res);
  }
  verifyServices() {
    if (!this.processService.processes$) {
      this.processService.list();
    }
    if (!this.departmentService.departments$) {
      this.departmentService.list();
    }
  }



  createForm() {
    this.form = this.fBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      avatar: [null],
      email: [null, [Validators.required, Validators.email]],
      department: [null, [Validators.required]],
      process: [null],
      password: [null, [Validators.required, Validators.minLength(3)]],
      password2: [null, [Validators.required, Validators.minLength(3)]],
      isLeaderDepartment: [null],
      isLeaderProcess: [null]
    });
  }

  openForm(typeForm: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      type: typeForm,
      edit: false
    };
    this.modal.open(FormDepartmentProcessComponent, dialogConfig);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.toApi());
      if (this.form.get('password').value ===  this.form.get('password2').value) {
      this.subs = this.userService.insert(this.toApi())
      .subscribe(res => {
        this.snackBar.openSnackBar('Usuário registrado com sucesso!', 'Ok!');
        this.userService.list();
        this.location.forward();
        this.close();
      }, error => console.error(error));
      } else {
        this.invalidPassword = true;
      }
    }
  }

  toApi() {
    let avatar = '';
    let isLeaderProcess = 0;
    let isLeaderDepartment = 0;
    let process = 0;

    if (this.form.get('avatar').value) {
      avatar = this.form.get('avatar').value;
    }
    if (this.form.get('process').value) {
      process = this.form.get('process').value;
      if (this.form.get('isLeaderProcess').value) {
        isLeaderProcess = 1;
      }
    }
    if (this.form.get('isLeaderDepartment').value) {
      isLeaderDepartment = 1;
    }

    return {
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      process: this.form.get('process').value,
      department: this.form.get('department').value,
      avatar,
      isLeaderDepartment,
      isLeaderProcess
    };
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.location.forward();
  }


  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
