import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory, IUserActivities } from '../models/home';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  UserAllTaskDetails = 'https://progress-tracker-api-3ca5.onrender.com/api/tracker'
  constructor(private http: HttpClient) { }

  getAllUserTaskDetails(email: string): Observable<IUserActivities> {
    return this.http.get<IUserActivities>(`${this.UserAllTaskDetails}/getAllActivities?userEmail=${email}`);
  }

  getAllCatagories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.UserAllTaskDetails}/getAllCatagories`, { headers: { 'Skip-Spinner': 'true' } });
  }

}
