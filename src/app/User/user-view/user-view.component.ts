import { Util } from 'src/app/shared/util';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DicService } from 'src/app/Dics/shared/dic.service';
import { UserService } from './../Shared/user.service';
import { ProcessService } from 'src/app/Process/Shared/process.service';
import { DepartmentService } from 'src/app/Department/Shared/department.service';
import { DicsComponent } from 'src/app/Dics/dic/dics.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private modal: MatDialog,
              private dialogRef: MatDialogRef<UserViewComponent>,
              private userService: UserService,
              private fBuilder: FormBuilder,
              private processService: ProcessService,
              private departmentService: DepartmentService,
              private dicService: DicService,
              private snackbar: Util) {
    this.verifyServices();
    this.getUsers();
    this.createForm();
    this.getDicsByUser();
  }
  user: any;
  currentUserId;
  dics$: any;
  edit = false;
  form: FormGroup;
  subs: Subscription;

  getUsers() {
    this.user = this.data.user;
    this.currentUserId = this.userService.getUserId(localStorage.getItem('currentUser'));
  }

  getDicsByUser() {
    this.subs = this.dicService.filterByUser(this.user.name).subscribe(dic => {this.dics$ = dic; });
  }

  verifyServices() {
    if (!this.processService.processes$) {
      this.processService.list();
    }
    if (!this.departmentService.departments$) {
      this.departmentService.list();
    }
  }

  editUser() {
    this.edit = !this.edit;
  }

  createForm() {
    this.form = this.fBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      avatar: [null],
      email: [null, [Validators.required]],
      department: [null, [Validators.required]],
      process: [null]
    });
    this.form.setValue({
      id: this.user.id,
      name: this.user.name,
      avatar: this.user.avatar,
      email: this.user.email,
      department: this.user.department.id,
      process: this.user.process.id
    });
  }

  viewDic(dicView) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '700px';
    dialogConfig.minHeight = '300px';
    dialogConfig.data = {
      dic: dicView
    };
    this.modal.open(DicsComponent, dialogConfig);
  }

  onSubmit() {
    this.userService.update(this.toApi())
    .subscribe(res => {
      this.snackbar.openSnackBar('Seu perfil foi editado com sucesso!', 'Ok!');
      this.userService.get(this.user.id).subscribe(user => this.user = user);
      this.edit = false;
    }, error => console.error(error));
  }

  toApi() {
    return {
      id: this.form.get('id').value,
      name: this.form.get('name').value,
      avatar: this.form.get('avatar').value,
      email: this.form.get('email').value,
      department: this.form.get('department').value,
      process: this.form.get('process').value,
      isLeaderDepartment: this.user.isLeaderDepartment,
      isLeaderProcess: this.user.isLeaderProcess
    };
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
  ngOnInit() {

  }

  close() {
    this.dialogRef.close();
  }

}
