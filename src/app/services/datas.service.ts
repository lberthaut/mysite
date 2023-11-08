import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:4500/api';

  constructor(private http: HttpClient) {}

  getDatas(endpoints: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoints}`);
  }
}
