import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Util } from 'src/app/shared/util';
import { PeriodService } from '../Shared/period.service';
import { Subscription } from 'rxjs';
import { Period } from '../Shared/period.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-period-form',
  templateUrl: './period-form.component.html',
  styleUrls: ['./period-form.component.css']
})

export class PeriodFormComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<PeriodFormComponent>,
              private fBuilder: FormBuilder,
              private snackbar: Util,
              private periodService: PeriodService,
              private datepipe: DatePipe) {
    this.createForm();
    }
  form: FormGroup;
  subs: Subscription;
  edit: false;
  period: Period;
  namePeriod = '';

  createForm() {
    this.form = this.fBuilder.group({
      id: [null],
      name: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      months: [null]
    });
  }

  setNamePeriod() {
    if (this.form.get('startDate').value && this.form.get('endDate').value) {
      const period = this.calculateDate();
      this.namePeriod = `${period.period}/ ${period.year}`;
    }
  }

  calculateDate() { // para preencher automaticamente o nome do período
    console.log(this.form.get('startDate').value);
    const startDate = this.form.get('startDate').value;
    const endDate = this.form.get('endDate').value;
    const month = endDate.getMonth() - startDate.getMonth();
    return {
      months: month,
      period: Math.ceil(endDate.getMonth() / month),
      year: endDate.getFullYear()
    };
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.data.type === 'new') {
        this.subs = this.periodService.insert(this.toApi())
        .subscribe(res => {
          this.snackbar.openSnackBar('Período inserido com sucesso!', 'Ok!');
          this.close();
        }, error => console.error(error));
      } else if (this.data.type === 'edit') {
        this.subs = this.periodService.update(this.form.value)
        .subscribe(res => {
          this.snackbar.openSnackBar('Período editado com sucesso!', 'Ok!');
          this.close();
        }, error => console.error(error));
      }
    }
  }

  toApi() {
    const startForm = this.form.get('startDate').value;
    const endForm = this.form.get('endDate').value;
    const start = this.datepipe.transform(startForm, 'yyyy-MM-dd');
    console.log(start);
    const end = this.datepipe.transform(endForm, 'yyyy-MM-dd');
    return {
      name: this.namePeriod,
      startDate: start,
      endDate: end,
      months: endForm.getMonth() - startForm.getMonth()
    };
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
