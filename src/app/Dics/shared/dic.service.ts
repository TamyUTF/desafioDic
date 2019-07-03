import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


import { DicApi } from './dic.model';

@Injectable({
  providedIn: 'root'
})
export class DicService {

  constructor(private http: HttpClient) { }
  readonly apiUrl = `${environment.API}Dics`;

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  insert(dic: DicApi) {
    return this.http.post<any>(this.apiUrl, dic);
  }

  delete(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  update(dic: DicApi) {
    return this.http.put<any>(this.apiUrl, dic);
  }

  filterByStatus(status: string) {
    return this.http.get<any>(`${this.apiUrl}?status=${status}`);
  }
  filterByUser(id: string) {
    return this.http.get<any>(`${this.apiUrl}?user=${id}`);
  }
  filterByDepartment(department: string) {
    return this.http.get<any>(`${this.apiUrl}?department=${department}`);
  }
  filterByProcess(process: string) {
    return this.http.get<any>(`${this.apiUrl}?process=${process}`);
  }

  filterByLate(late: number) {
    return this.http.get<any>(`${this.apiUrl}?late=${late}`);
  }

}
