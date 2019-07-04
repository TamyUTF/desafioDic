import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserService } from './../../User/Shared/user.service';
import { Department } from './../Shared/department.model';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Dic } from 'src/app/Dics/shared/dic.model';
import { DicService } from 'src/app/Dics/shared/dic.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<DepartmentComponent>,
              private userService: UserService,
              private dicService: DicService,
              private location: Location) {
                this.getDepartment();
                this.getDics();
                this.getUserByDepartment();
  }
  users$: any;
  department: Department;
  subsDic: Subscription;
  subsUser: Subscription;
  dics$: Dic;
  toDo: Dic[];
  doing: Dic[];
  done: Dic[];
  total: Dic[];

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

  getUserByDepartment() {
    this.subsUser = this.userService.getAll()
    .subscribe(user => {
      this.users$ = user.filter(res => res.department.id === this.data.department.id);
    });
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
