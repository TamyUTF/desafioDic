import { SecurityService } from './../../core/security.service';
import { UserApi, User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
              private securityService: SecurityService) { }
  readonly apiUrl = `${environment.API}Users`;
  users$: Observable<any[]>;

  list() {
    this.users$ = this.http.get<any[]>(this.apiUrl);
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  get(id) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getDicByUser(id) {
    return this.http.get<any[]>(`${this.apiUrl}/dics/${id}`);
  }

  insert(user) {
    return this.http.post<any>(this.apiUrl, user);
  }

  delete(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  update(user) {
    return this.http.put<any>(this.apiUrl, user);
  }

  getUserId(id) {
    return this.securityService.decryptoId(id);
  }

  toApi(user, isLeaderDepartment?, isLeaderProcess?, department?, process?, isAdmin?) {
    const userApi  = {
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      department: user.department,
      process: user.process,
      password: user.password,
      isLeaderDepartment: 0,
      isLeaderProcess: 0,
      isAdmin: user.isAdmin,
      removed: 0
    };
    if (user.isLeaderDepartment || isLeaderDepartment) {
      userApi.isLeaderDepartment = 1;
    }
    if (user.isLeaderProcess || isLeaderProcess) {
      userApi.isLeaderProcess = 1;
    }
    if (department) {
      userApi.department = department;
    }
    if (isAdmin) {
      userApi.isAdmin = isAdmin;
    }

    if (process || process === null) {
      userApi.process = process;
    }
    return userApi;
  }

}
