import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserService } from './../../User/Shared/user.service';
import { Department } from './../Shared/department.model';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { Dic } from 'src/app/Dics/shared/dic.model';
import { DicService } from 'src/app/Dics/shared/dic.service';
import { UserViewComponent } from 'src/app/User/user-view/user-view.component';
import { DicsComponent } from 'src/app/Dics/dic/dics.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private modal: MatDialog,
              private dialogRef: MatDialogRef<DepartmentComponent>,
              private userService: UserService,
              private dicService: DicService,
              private location: Location) {
                this.getDepartment();
                this.getDics();
                this.getUsersByDepartment();
  }
  users$: any;
  department: Department;
  subsDic: Subscription;
  subsUser: Subscription;
  dics$: Dic;
  toDo: Dic[];
  doing: Dic[];
  done: Dic[];

  getDics() {
    this.subsDic = this.dicService.filterByDepartment(this.department.name)
    .subscribe(dics => { this.dics$ = dics;
                         this.filterDics(dics);
                        });
  }

  filterDics(dics) {
    this.toDo = dics.filter(dic => dic.status.name === 'Definindo');
    this.doing = dics.filter(dic => dic.status.name === 'Definido');
    this.done = dics.filter(dic => dic.status.name === 'Concluído');
  }

  getDepartment() {
    this.department = this.data.department;
  }

  getUsersByDepartment() {
    this.subsUser = this.userService.getAll()
    .subscribe(user => {
      this.users$ = user.filter(res => res.department.id === this.department.id);
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

  viewUser(userView) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '700px';
    dialogConfig.minHeight = '300px';
    dialogConfig.data = {
      user : userView
    };
    this.modal.open(UserViewComponent, dialogConfig);
  }

  close() {
    this.dialogRef.close();
    this.location.go('departments');
  }

  ngOnDestroy() {
    this.subsDic.unsubscribe();
    this.subsDic.unsubscribe();
  }

  ngOnInit() {
  }

}
