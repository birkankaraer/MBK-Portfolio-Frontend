import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { contact } from '../models/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  contact(contact: contact): Observable<any> {
    return this.http.post<any>('http://mbkglobalapi.runasp.net/api/Contact', contact);
  }
}
