import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { UserLogin } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  readonly apiUrl = `${environment.API}Users/authenticate`;

  login(userLogin: UserLogin) {
    return this.http.post<any>(this.apiUrl, userLogin);
  }

}
