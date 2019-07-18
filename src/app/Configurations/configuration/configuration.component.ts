import { PeriodFormComponent } from './../../Period/period-form/period-form.component';
import { Subscription } from 'rxjs';
import { PeriodService } from './../../Period/Shared/period.service';
import { Util } from './../../shared/util';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigurationService } from '../Shared/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<ConfigurationComponent>,
              private fBuilder: FormBuilder,
              private modal: MatDialog,
              private snackbar: Util,
              private configurationService: ConfigurationService,
              private periodService: PeriodService) {
    this.getConfiguration();
    this.verifyServices();
    this.createForm();
  }

  edit = false;
  form: FormGroup;
  configuration: any;
  subs: Subscription;
  addSubs: Subscription;
  periodView: any;

  getConfiguration() {
    this.configurationService.get(2).toPromise().then(res => this.configuration = res).catch(error => console.error(error));
  }

  verifyServices() {
    if (!this.periodService.periods$) {
      this.periodService.list();
    }
  }
  registerPeriod() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.minHeight = '350px';
    dialogConfig.data = {
      type: 'new'
    };
    this.modal.open(PeriodFormComponent, dialogConfig);
  }

  createForm() {
    this.form = this.fBuilder.group({
      id: [null],
      periodForm: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.configuration !== undefined ) {
        this.configurationService.update({id: this.configuration.id, idPeriod: this.form.get('periodForm').value.id})
        .subscribe(res => {
          this.snackbar.openSnackBar('Período definido com sucesso!', 'Ok!');
          this.configurationService.get(this.configuration.id).toPromise().then(config => this.configuration = config);
          this.edit = false;
        }, error => console.error(error));
      } else {
        this.configurationService.insert({idPeriod: this.form.get('periodForm').value.id})
        .subscribe(res => {
          this.snackbar.openSnackBar('Período definido com sucesso!', 'Ok!');
          this.configurationService.get(this.configuration.id).toPromise().then(config => this.configuration = config);
          this.edit = false;
        }, error => console.error(error));
      }
    }
  }

  close() {
    this.dialogRef.close();
  }


  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  ngOnInit() {

  }

}
