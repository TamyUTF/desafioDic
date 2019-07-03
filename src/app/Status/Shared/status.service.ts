import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }
  readonly apiUrl = `${environment.API}Status`;

  status$: Observable<any[]>;

  list() {
    this.status$ = this.http.get<any[]>(this.apiUrl);
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
