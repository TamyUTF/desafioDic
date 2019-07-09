import { UserEventService } from './../../User/Shared/user-event.service';
import { AuthService } from './../../core/auth.service';
import { User } from './../../User/Shared/user.model';
import { UserService } from './../../User/Shared/user.service';
import { DicService } from './../shared/dic.service';
import { DicsComponent } from '../dic/dics.component';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Dic } from '../shared/dic.model';
import { DicFormComponent } from '../dic-form/dic-form.component';
import { DicEventService } from '../shared/dic-event.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import { DialogueInputComponent } from 'src/app/shared/dialogue-input/dialogue-input.component';

@Component({
  selector: 'app-dic-list',
  templateUrl: './dic-list.component.html',
  styleUrls: ['./dic-list.component.css']
})
export class DicListComponent implements OnInit, OnDestroy {

  constructor(public modal: MatDialog,
              private router: Router,
              private dicEventService: DicEventService,
              private dicService: DicService,
              private userService: UserService,
              private authService: AuthService,
              private userEventService: UserEventService) {
    this.verifyUser();
  }
  filters = ['Empreendedorismo', 'Colaborador', 'Periodo'];
  teste = false;
  user: User;
  isLogged: boolean;
  dics: Dic[];
  dicDone: Dic[];
  dicToDo: Dic[];
  dicDoing: Dic[];
  subs: Subscription;
  dialogSubs: Subscription;
  dicDropped: any;

  verifyUser() {
    if (this.authService.isAuthenticated) {
      this.userEventService.getUser();
    }
  }

  getDics() {
    this.dicEventService.getAll();
    this.subs = this.dicEventService.dicListEvent
                .subscribe(dics => this.initializeDics(dics));
  }

  initializeDics(dics) {
    this.dicToDo = dics.filter(dic => dic.status.name === 'Definindo');
    this.dicDoing = dics.filter(dic => dic.status.name === 'Definido');
    this.dicDone = dics.filter(dic => dic.status.name === 'Concluído');
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.changeStatus(event.item.data);
    }
  }

  changeStatus(dic) {
    console.log('aaaaaaaaaa');
    console.log(dic);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      msg: 'Informe a data de conclusão do desafio.',
      startDate: dic.data.startDate
    };
    const dialogRef = this.modal.open(DialogueInputComponent, dialogConfig);
    this.dialogSubs = dialogRef.afterClosed().subscribe(
    res => {
      if (res.confirm && res.date) {
        this.dicService.update(this.toApi(dic, res.date)).subscribe(res => {
          console.log('deu bom :)');
        }, error => console.log('deu ruim' + error));
      }
    });
  }
  noReturnPredicate() {
    return false;
  }

  evenPredicate(item: CdkDrag<string>) {
    if (item.data === 'concluded') {
      return true;
    } else {
      return false;
    }
  }
  otherPredicate(item: CdkDrag<string>) {
    console.log(item.data);
    if (item.data === 'defined') {
      return true;
    } else {
      return false;
    }
  }

  toApi(dic, date) {
    return {
      idUser: dic.user.id,
      idStatus: dic.status.id,
      idPeriod: dic.period.id,
      description: dic.description,
      finishedData: date
    };
  }

  create() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '700px';
    dialogConfig.minHeight = '300px';
    this.modal.open(DicFormComponent, dialogConfig);
  }

  view(dicView) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '700px';
    dialogConfig.minHeight = '300px';
    dialogConfig.data = {
      dic: dicView
    };
    this.modal.open(DicsComponent, dialogConfig);
  }

  ngOnInit() {
    this.getDics();
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
