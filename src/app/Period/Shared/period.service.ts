import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private http: HttpClient) { }
  readonly apiUrl = `${environment.API}Periods`;

  periods$: Observable<any[]>;

  list() {
    this.periods$ = this.http.get<any[]>(this.apiUrl);
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
}
