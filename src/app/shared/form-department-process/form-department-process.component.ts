import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProcessService } from 'src/app/Process/Shared/process.service';
import { DepartmentService } from 'src/app/Department/Shared/department.service';
import { UserService } from './../../User/Shared/user.service';
import { Util } from '../util';
import { Department } from 'src/app/Department/Shared/department.model';
import { User } from 'src/app/User/Shared/user.model';

@Component({
  selector: 'app-form-department-process',
  templateUrl: './form-department-process.component.html',
  styleUrls: ['./form-department-process.component.css']
})
export class FormDepartmentProcessComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subs: Subscription;
  department: Department;
  process: any;
  edit: false;
  processLeader: any;
  departmentLeader: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<FormDepartmentProcessComponent>,
              private fBuilder: FormBuilder,
              private snackbar: Util,
              private location: Location,
              private userService: UserService,
              private processService: ProcessService,
              private departmentService: DepartmentService) {
    this.createForm();
    this.setData();
    this.verifyServices();
  }

  verifyServices() {
    if (!this.processService.processes$) {
      this.processService.list();
    }
    if (!this.departmentService.departments$) {
      this.departmentService.list();
    }
    if (!this.userService.users$) {
      this.userService.list();
    }
  }

  // getProcessLeader(idProcess) {
  //   this.userService.users$.subscribe(user => {
  //     this.processLeader = user.find(res => res.process.id === idProcess && res.isLeaderProcess === 1);
  //     this.updateFormProcess(this.processLeader);
  //   });
  // }

  // getDepartmentLeader(idDepartment) {
  //   this.userService.getAll().subscribe(user => {
  //     this.departmentLeader = user.find(res => res.department.id === idDepartment && res.isLeaderDepartment === 1);
  //     this.updateFormDepartment(this.departmentLeader);
  //   });

  // }

  onSubmit() {
    if (this.form.valid) {
      if (this.data.type === 'department') {
        if (this.edit) {
          this.subs = this.departmentService.update(this.toApi())
            .subscribe(res => {
              this.snackbar.openSnackBar('Empreendimento atualizado com sucesso!', 'Ok!');
              this.departmentService.list();
              this.close();
            }, error => console.error(error));
        } else {
          console.log(this.form.value);
          this.subs = this.departmentService.insert(this.toApi())
            .subscribe(res => {
              this.snackbar.openSnackBar('Empreendimento inserido com sucesso!', 'Ok!');
              this.departmentService.list();
              this.close();
            }, error => console.error(error));
        }
      } else
        if (this.data.type === 'process') {
          if (this.edit) {
            this.subs = this.processService.update(this.toApi())
              .subscribe(res => {
                this.snackbar.openSnackBar('Processo atualizado com sucesso!', 'Ok!');
                this.processService.list();
                this.close();
              }, error => console.error(error));
          } else {
            this.subs = this.processService.insert(this.toApi())
              .subscribe(res => {
                this.snackbar.openSnackBar('Processo inserido com sucesso!', 'Ok!');
                this.processService.list();
                this.close();
              }, error => console.error(error));
          }
        }
    }
  }

  // setUserLeader(user) {
  //   if (this.processLeader.id !== user.id) {

  //   }
  // }

  // userToApi(processLeader?, departmentLeader?) {

  // }

  toApi() {
    if (this.data.type === 'process') {
      if (this.edit) {
        return ({
          id: this.process.id,
          name: this.form.get('process').value,
          idDepartment: this.form.get('department').value
        });
      } else {
        return ({
          name: this.form.get('process').value,
          idDepartment: this.form.get('department').value
        });
      }
    } else
      if (this.data.type === 'department') {
        if (this.edit) {
          return ({
            id: this.department.id,
            name: this.form.get('department').value
          });
        } else {
          return ({
            name: this.form.get('department').value
          });
        }
      }
  }

  /*Caso foi editar, essa função vai setar process/ department e edit */
  setData() {
    if (this.data.type === 'department') {
      this.department = this.data.department;
      this.edit = this.data.edit;
      if (this.edit) {
        this.form.setValue({
          id: this.department.id,
          department: this.department.name
        });
        // this.getDepartmentLeader(this.department.id);
      }
    } else if (this.data.type === 'process') {
      this.process = this.data.process;
      this.edit = this.data.edit;
      if (this.edit) {
        this.form.setValue({
          id: this.process.id,
          process: this.process.name,
          department: this.process.department.id
        });
        // this.getProcessLeader(this.process.id);
      }
    }
  }

  // updateFormProcess(idProcessLeader) {
  //   this.form.setValue({
  //     id: this.process.id,
  //     process: this.process.name,
  //     department: this.process.department.id,
  //     leader: idProcessLeader.id
  //   });
  // }

  // updateFormDepartment(idDepartmentLeader) {
  //   this.form.setValue({
  //     id: this.department.id,
  //     department: this.department.name,
  //     leader: idDepartmentLeader.id
  //   });
  // }

  createForm() {
    if (this.data.type === 'department') {

      this.form = this.fBuilder.group({
        id: [null],
        department: [null, [Validators.required, Validators.minLength(3)]],
        // leader: [null, [Validators.required]]
      });
    } else
      if (this.data.type === 'process') {
        this.form = this.fBuilder.group({
          id: [null],
          department: [null, [Validators.required]],
          process: [null, [Validators.required, Validators.minLength(3)]],
          // leader: [null, [Validators.required]]
        });
        if (this.data.departmentId) {
          this.form.setValue({
            id: null,
            process: null,
            department: this.data.departmentId,
            // leader: null
          });
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
