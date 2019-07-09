import { ProcessApi } from './process.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(private http: HttpClient) { }
  readonly apiUrl = `${environment.API}Processes`;

  processes$: Observable<any[]>;

  list() {
    this.processes$ = this.http.get<any[]>(this.apiUrl);
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  insert(process: any) {
    return this.http.post<any>(this.apiUrl, process);
  }

  delete(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  update(process: any) {
    return this.http.put<any>(this.apiUrl, process);
  }

}
