import { SecurityService } from './../../core/security.service';
import { UserApi, User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProcessService } from 'src/app/Process/Shared/process.service';
import { DepartmentService } from 'src/app/Department/Shared/department.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
              private securityService: SecurityService,
              private departmentService: DepartmentService,
              private processService: ProcessService) { }
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

  verifyDepartmentLeader(idDepartment) {
    this.getAll().subscribe(user => {
      const userRes = user.find(res => ((res.department.id === idDepartment) && (res.isLeaderDepartment === 1)));
      if (userRes) {
        return true;
      } else {
        return false;
      }
    });
  }

  verifyProcessLeader(idProcess) {
    this.getAll().subscribe(user => {
      const userRes = user.find(res => ((res.department.id === idProcess) && (res.isLeaderProcess === 1)));
      if (userRes) {
        return true;
      } else {
        return false;
      }
    });
  }


}
