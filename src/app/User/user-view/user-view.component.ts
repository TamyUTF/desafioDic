import { UserService } from './../Shared/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../Shared/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProcessService } from 'src/app/Process/Shared/process.service';
import { DepartmentService } from 'src/app/Department/Shared/department.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<UserViewComponent>,
              private userService: UserService,
              private fBuilder: FormBuilder,
              private processService: ProcessService,
              private departmentService: DepartmentService) { }
  user: User;
  edit = false;
  form: FormGroup;

  getUser() {
    this.user = this.data.user;
    console.log(this.user);
  }

  editUser() {
    this.edit = !this.edit;
    this.processService.list();
    this.departmentService.list();
    this.createForm();
  }

  createForm() {
    this.form = this.fBuilder.group({
      name: [null, [Validators.required]],
      avatar: [null],
      email: [null, [Validators.required]],
      department: [null, [Validators.required]],
      process: [null]
    });
    this.form.patchValue(this.user);
  }

  ngOnInit() {
    this.getUser();
  }

  close() {
    this.dialogRef.close();
  }

}
