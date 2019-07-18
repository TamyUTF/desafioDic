import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigurationService } from './../../Configurations/Shared/configuration.service';
import { UserEventService } from './../../User/Shared/user-event.service';
import { UserService } from './../../User/Shared/user.service';
import { DicService } from './../shared/dic.service';
import { Subscription } from 'rxjs';
import { PeriodService } from 'src/app/Period/Shared/period.service';
import { Util } from './../../shared/util';

@Component({
  selector: 'app-dic-form',
  templateUrl: './dic-form.component.html',
  styleUrls: ['./dic-form.component.css']
})
export class DicFormComponent implements OnInit, OnDestroy {

  constructor(  @Inject(MAT_DIALOG_DATA) public data,
                private dialogRef: MatDialogRef<DicFormComponent>,
                private router: Router,
                private fBuilder: FormBuilder,
                private dicService: DicService,
                private userService: UserService,
                private periodService: PeriodService,
                private snackbar: Util,
                private location: Location,
                private configurationService: ConfigurationService) {
    this.getConfiguration();
    this.verifyServices();
    this.createForm();
  }
  subs: Subscription;
  form: FormGroup;
  userId: any;
  configuration: any;

  getConfiguration() {
    this.configurationService.get(2).toPromise().then(res => {this.configuration = res;});
  }

  verifyServices() {
    if (!this.periodService.periods$) {
      this.periodService.list();
    }
  }

  createForm() {
    this.form = this.fBuilder.group({
      idUser: [null],
      idStatus: [null],
      idPeriod: [null],
      description: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dicService.insert({
        idUser: this.userService.getUserId(localStorage.getItem('currentUser')),
        idStatus: 2,
        idPeriod: this.configuration.period.id,
        description: this.form.get('description').value
      })
      .subscribe(res => {
        this.snackbar.openSnackBar('Dic foi criado com sucesso!', 'Ok!');
        this.router.navigate(['dics']);
        this.close();
      }, error => { this.snackbar.openSnackBar('Ocorreu um erro.', 'Noo! :(');
                    console.error('Deu ruim:' + error); });
    }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.location.go('/dics');
  }

}
