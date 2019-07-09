import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { UserService } from 'src/app/User/Shared/user.service';
import { DicService } from 'src/app/Dics/shared/dic.service';
import { Process } from '../Shared/process.model';
import { Dic } from 'src/app/Dics/shared/dic.model';
import { DicsComponent } from 'src/app/Dics/dic/dics.component';
import { UserViewComponent } from 'src/app/User/user-view/user-view.component';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private modal: MatDialog,
              private dialogRef: MatDialogRef<ProcessComponent>,
              private userService: UserService,
              private dicService: DicService,
              private location: Location) {
                this.getProcess();
                this.getUsersByProcess();
                this.getDics();
              }
  users$: any;
  process: Process;
  subsDic: Subscription;
  subsUser: Subscription;
  dics$: Dic;
  toDo: Dic[];
  doing: Dic[];
  done: Dic[];

  getDics() {
    this.subsDic = this.dicService.filterByProcess(this.process.name)
    .subscribe(dics => {
      this.dics$ = dics;
      this.filterDics(dics);
    });
  }

  filterDics(dics) {
    this.toDo = dics.filter(dic => dic.status.name === 'Definindo');
    this.doing = dics.filter(dic => dic.status.name === 'Definido');
    this.done = dics.filter(dic => dic.status.name === 'Concluído');
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
    dialogConfig.height = '300px';
    dialogConfig.data = {
      user : userView
    };
    this.modal.open(UserViewComponent, dialogConfig);
  }


  getProcess() {
    this.process = this.data.process;
  }

  getUsersByProcess() {
    this.subsUser = this.userService.getAll()
    .subscribe(user => {
      this.users$ = user.filter(res => {
        if (res.process !== null) {
          return res.process.id === this.data.process.id;
        }
      });
    });
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subsDic.unsubscribe();
    this.subsUser.unsubscribe();
  }

  ngOnInit() {
  }

}
