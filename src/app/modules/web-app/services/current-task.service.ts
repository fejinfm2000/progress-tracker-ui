import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISubActivity } from '../models/home';

@Injectable({
  providedIn: 'root'
})
export class CurrentTaskService {
  userAllTaskDetails_url = 'https://progress-tracker-api-3ca5.onrender.com/api/tracker'
  constructor(private http: HttpClient) { }

  getAllSubActivity(activityId: number): Observable<ISubActivity[]> {
    return this.http.get<ISubActivity[]>(`${this.userAllTaskDetails_url}/getSubActivity/${activityId}`);
  }
}
