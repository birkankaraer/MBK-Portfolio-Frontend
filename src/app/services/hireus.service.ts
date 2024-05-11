import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hireus } from '../models/hireus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HireusService {

  constructor(private http: HttpClient) { }

  hireUs(hireus: Hireus): Observable<any> {
    return this.http.post<any>('https://localhost:7052/api/Hireus', hireus);
  }
}
