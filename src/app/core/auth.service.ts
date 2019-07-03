import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserEventService } from './../User/Shared/user-event.service';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private jwt: JwtHelperService,
              private userEventService: UserEventService,
              private router: Router,
              private securityService: SecurityService) { }
    readonly apiUrl = `${environment.API}Users`;
    subs: Subscription;
    isLogged = new EventEmitter<boolean>();

  registerUser(user) {
    return this.http.post<any>(this.apiUrl, user);
  }

  loginUser(user) {
    this.subs = this.http.post<any>(`${this.apiUrl}/authenticate`, user)
    .subscribe(userLogin => {
        if (userLogin.token) {
        console.log(userLogin.user.id);
        const cryptoId = this.securityService.cryptoId(userLogin.user.id);
        localStorage.setItem('currentUser', cryptoId);
        localStorage.setItem('token', userLogin.token);
        this.router.navigate(['dics']);
      }
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (this.jwt.isTokenExpired(token)) {
      this.isLogged.emit(true);
      return true;
    } else {
      this.isLogged.emit(false);
      return false;
    }
  }

  logout() {
    this.userEventService.logoutUser();
    localStorage.removeItem('token');
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
