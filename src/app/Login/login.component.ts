import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLogin } from './shared/login.model';
import { AuthService } from '../core/auth.service';
import { UserEventService } from '../User/Shared/user-event.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private userEventService: UserEventService) {
    this.createForm();
    this.verifyUser();
  }
  userLogin: UserLogin;
  form: FormGroup;

  ngOnInit() {
  }

  verifyUser() {
    if (this.authService.isAuthenticated) {
      this.userEventService.getUser();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.userLogin = this.form.value;
      this.authService.loginUser(this.userLogin);
    }
  }

  createForm() {
    this.form = this.fBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

}
