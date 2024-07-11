import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { contact } from '../models/contact';
import { environment } from '../../environment';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  contact(contact: contact): Observable<any> {
    return this.http.post<any>(this.apiUrl, contact);
  }
}
