import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://progress-tracker-api-3ca5.onrender.com/api/tracker';
  private localUrl = 'http://localhost:8080/api/tracker';

  constructor(private http: HttpClient) { }

  addUser(user: IUser): Observable<IUser> {
    return this.http.patch<IUser>(this.apiUrl + `/addUser`, user);
  }

}
