import { ConfigurationService } from './../../Configurations/Shared/configuration.service';
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
import { Util } from 'src/app/shared/util';

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
              private userEventService: UserEventService,
              private configurationService: ConfigurationService,
              private snackbar: Util) {
    this.setConfiguration();
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
  configuration: any;

  setConfiguration() {
    if (localStorage.getItem('configuration') !== null) {
      this.configurationService.setConfiguration();
    } else {
      this.configuration = localStorage.getItem('configuration');
    }
  }

  verifyUser() {
    if (this.authService.isAuthenticated) {
      this.userEventService.getUser();
    }
  }

  getDics() {
    this.dicEventService.getAll();
    this.subs = this.dicEventService.dicListEvent
                .subscribe(dics => {
                  const dicsFiltered = dics.filter(dics.period.id === this.configuration.period.id);
                  this.initializeDics(dicsFiltered); });
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
      this.changeStatus();
    }
  }

  changeStatus() {
    if (this.dicDropped.status.id === 1) {
      this.dicService.update(this.toApi(this.dicDropped))
      .subscribe(res => {
        console.log('Foi alterado');
        this.getDics();
       },
      error => console.error(error));

    } else if (this.dicDropped.status.id === 2) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '350px',
      dialogConfig.minHeight = '300px',
      dialogConfig.data = {
        msg: 'Informe a data de conclusão do desafio.',
        startDate: this.dicDropped.startDate,
        maxDate: this.dicDropped.period.endDate,
      };
      const dialogRef = this.modal.open(DialogueInputComponent, dialogConfig);
      this.dialogSubs = dialogRef.afterClosed().subscribe(
        res => {
          this.dicDropped.finishedDate = res.date;
          this.dicService.update(this.toApi(this.dicDropped, res.date)).subscribe(res => {
            this.snackbar.openSnackBar('Dic foi concluído!', 'Ok!');
            this.getDics();
          }, error => console.log('deu ruim' + error));
        }
      );
    }
  }

  setDicDropped(dic) {
    this.dicDropped = dic;
  }

  noReturnPredicate() {
    return false;
  }

  evenPredicate(item: CdkDrag<string>) {
    if (item.data === 'dicDoing') {
      return true;
    } else {
      return false;
    }
  }

  otherPredicate(item: CdkDrag<string>) {
    if (item.data === 'dicToDo') {
      return true;
    } else {
      return false;
    }
  }

  toApi(dic, date?) {
    if (dic.status.id === 1) {
      return {
        id: dic.id,
        idUser: dic.user.id,
        idStatus: 2,
        idPeriod: dic.period.id,
        description: dic.description
      };
    } else if (dic.status.id === 2 && date) {
      return {
        id: dic.id,
        idUser: dic.user.id,
        idStatus: 3,
        idPeriod: dic.period.id,
        description: dic.description,
        finishedData: date
      };
    }
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
