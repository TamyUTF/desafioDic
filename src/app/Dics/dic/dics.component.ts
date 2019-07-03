import { SecurityService } from './../../core/security.service';
import { User } from 'src/app/User/Shared/user.model';
import { Subscription } from 'rxjs';
import { UserService } from './../../User/Shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Util } from './../../shared/util';
import { Dic } from '../shared/dic.model';
import { DicService } from '../shared/dic.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dics',
  templateUrl: './dics.component.html',
  styleUrls: ['./dics.component.css']
})
export class DicsComponent implements OnInit, OnDestroy {

  constructor(  @Inject(MAT_DIALOG_DATA) public data,
                private dialogRef: MatDialogRef<DicsComponent>,
                private dicService: DicService,
                private router: Router,
                private fBuilder: FormBuilder,
                private snackbar: Util,
                private location: Location,
                private userService: UserService) {
    this.getDic();
    this.userId = this.userService.getUserId(localStorage.getItem('currentUser'));
    this.createForm();
  }
  dic: Dic;
  userId;
  form: FormGroup;
  subs: Subscription;

  getDic() {
    this.dic = this.data.dic;
  }

  createForm() {
    this.form = this.fBuilder.group({
      id: [this.dic.id],
      idUser: [this.dic.user.id],
      idStatus: [this.dic.status.id],
      idPeriod: [this.dic.period.id],
      description: [null, [Validators.required]]
    });
  }

  updateForm() {
    this.form.patchValue(this.dic);
  }
  ngOnDestroy() {
    this.location.go('/dics');
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dicService.update(this.form.value)
    .subscribe(res => {
      this.snackbar.openSnackBar('Dic foi atualizado com sucesso!', 'Ok!');
      this.router.navigate(['dics']);
      this.close();
    }, error => {this.snackbar.openSnackBar('Ocorreu um erro.', 'Noo! :(');
                 console.error(error); });
  }

  ngOnInit() {
    this.updateForm();
  }

}
