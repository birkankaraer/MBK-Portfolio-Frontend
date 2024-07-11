import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tech } from '../models/tech';

@Injectable({
  providedIn: 'root'
})
export class TechService {
  private apiUrl = 'https://mbkglobalapi.runasp.net/api/Tech';

  constructor(private http: HttpClient) { }

  getTechById(id: number): Observable<Tech> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Tech>(url);
  }
}
