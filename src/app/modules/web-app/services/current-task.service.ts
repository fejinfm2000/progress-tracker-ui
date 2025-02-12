import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IActivityDetails, ISubActivity } from '../models/home';

@Injectable({
  providedIn: 'root'
})
export class CurrentTaskService {
  userAllTaskDetails_url = 'https://progress-tracker-api-3ca5.onrender.com/api/tracker'
  constructor(private http: HttpClient) { }

  getAllSubActivity(activityId: number, email: string): Observable<ISubActivity[]> {
    return this.http.get<ISubActivity[]>(`${this.userAllTaskDetails_url}/getSubActivity/${activityId}?email=${email}`);
  }

  onUpdateSubActivity(activityId: number, updatedData: IActivityDetails): Observable<ISubActivity[]> {
    return this.http.patch<ISubActivity[]>(`${this.userAllTaskDetails_url}/patchSubActivity/${activityId}`, updatedData);
  }
}
