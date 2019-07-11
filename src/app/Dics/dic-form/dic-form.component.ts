import { UserEventService } from './../../User/Shared/user-event.service';
import { Location } from '@angular/common';
import { Util } from './../../shared/util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../../User/Shared/user.service';
import { DicService } from './../shared/dic.service';
import { Subscription } from 'rxjs';
import { PeriodService } from 'src/app/Period/Shared/period.service';

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
                private userEventService: UserEventService,
                private periodService: PeriodService,
                private snackbar: Util,
                private location: Location) {
    this.verifyServices();
    this.createForm();
  }
  subs: Subscription;
  form: FormGroup;
  userId: any;

  verifyServices() {
    if (!this.periodService.periods$) {
      this.periodService.list();
    }
  }

  createForm() {
    this.form = this.fBuilder.group({
      idUser: [this.userService.getUserId(localStorage.getItem('currentUser'))],
      idStatus: [2],
      idPeriod: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dicService.insert(this.form.value)
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
