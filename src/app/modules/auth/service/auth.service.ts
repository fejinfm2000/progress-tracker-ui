import { HttpClient, HttpParams } from '@angular/common/http';
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

  addUser(user: IUser, message: string): Observable<IUser> {
    return this.http.patch<IUser>(this.apiUrl + `/addUser`, user, { headers: { 'success-snack-bar': 'true', message } });
  }

  isUserPersent(user: IUser) {
    return this.http.get(this.apiUrl + `/isUserPersent?email=${user.email}&passwordHash=${user.passwordHash}`);
  }

}
