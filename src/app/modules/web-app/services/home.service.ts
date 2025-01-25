import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IActivityDetails, ICategory, IUserActivities } from '../models/home';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  userAllTaskDetails_url = 'https://progress-tracker-api-3ca5.onrender.com/api/tracker'
  constructor(private http: HttpClient) { }

  getAllUserTaskDetails(email: string): Observable<IUserActivities> {
    return this.http.get<IUserActivities>(`${this.userAllTaskDetails_url}/getAllActivities?userEmail=${email}`);
  }

  getAllCatagories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.userAllTaskDetails_url}/getAllCatagories`, { headers: { 'Skip-Spinner': 'true' } });
  }

  addActivities(data: IActivityDetails): Observable<IUserActivities[]> {
    return this.http.patch<IUserActivities[]>(`${this.userAllTaskDetails_url}/addActivityDetails`, data, { headers: { 'success-snack-bar': 'true', message: 'Task Created' } });
  }

}
