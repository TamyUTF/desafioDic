import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpClient) { }
  readonly apiUrl = `${environment.API}Configurations`;

  configurations$: Observable<any[]>;
  subs: Subscription;

  list() {
    this.configurations$ = this.http.get<any[]>(this.apiUrl);
  }

  get(id) {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  insert(period) {
    return this.http.post<any>(this.apiUrl, period);
  }

  delete(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  update(period) {
    return this.http.put<any>(this.apiUrl, period);
  }

  setConfiguration() {
    this.subs = this.getAll().subscribe(res => console.log(res[0]));
  }
}
