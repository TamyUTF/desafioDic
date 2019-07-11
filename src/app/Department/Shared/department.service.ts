import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Department } from './department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }
  readonly apiUrl = `${environment.API}Departments`;

  departments$: Observable<any[]>;

  list() {
    this.departments$ = this.http.get<any[]>(this.apiUrl);
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  insert(department) {
    return this.http.post<any>(this.apiUrl, department);
  }

  delete(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  update(department) {
    return this.http.put<any>(this.apiUrl, department);
  }
}
