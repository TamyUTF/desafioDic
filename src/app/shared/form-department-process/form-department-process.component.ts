import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProcessService } from 'src/app/Process/Shared/process.service';
import { DepartmentService } from 'src/app/Department/Shared/department.service';
import { UserService } from './../../User/Shared/user.service';
import { Util } from '../util';

@Component({
  selector: 'app-form-department-process',
  templateUrl: './form-department-process.component.html',
  styleUrls: ['./form-department-process.component.css']
})
export class FormDepartmentProcessComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<FormDepartmentProcessComponent>,
              private fBuilder: FormBuilder,
              private snackbar: Util,
              private location: Location,
              private userService: UserService,
              private processService: ProcessService,
              private departmentService: DepartmentService) {
    this.userService.list();
    this.processService.list();
    this.departmentService.list();
    this.createForm();
  }
  form: FormGroup;
  subs: Subscription;

  onSubmit() {
    if (this.form.valid) {
      if (this.data.type === 'department') {
        this.subs = this.departmentService.insert(this.form.value)
        .subscribe(res => {
          if (this.form.get('leader')) {
            console.log(this.form.get('leader'));
            console.log(this.form.get('leader').value);
            const userApi = this.userService.toApi(this.form.get('leader').value, true, false, res.id, null);
            this.userService.update(userApi).subscribe(response => {
              console.log('Cadastrado com sucesso!');
            }, error => console.error(error));
          }
          if (this.form.get('involveds')) {
            this.form.get('involveds').value.forEach(involveds => {
              const userApi = this.userService.toApi(involveds, false, false , res.id, null);
              this.userService.update(userApi).subscribe(response => {
                console.log('Cadastrado com sucesso!');
              }, error => console.error(error));
            });
          }
          this.snackbar.openSnackBar('Empreendimento inserido com sucesso!', 'Ok!');
          // this.departmentService.list();
        }, error => console.error(error));
        // if (this.data.get('leader').value) {
        // }
      }

    }
  }

  createForm() {
    if (this.data.type === 'department') {
      this.form = this.fBuilder.group({
        name: [null, [Validators.required]],
        leader: [null],
        involveds: [null]
      });
    } else if (this.data.type === 'process') {
      this.form = this.fBuilder.group({
        department: [null, [Validators.required]],
        process: [null, [Validators.required]],
        leader: [null],
        involveds: [null]
      });
    }
  }
  ngOnInit() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
