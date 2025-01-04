import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IVisitor } from '../models/visitor';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  private apiUrl = 'https://progress-tracker-api-3ca5.onrender.com/api/tracker';
  private localUrl = 'http://localhost:8080/api/tracker';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IVisitor[]> {
    return this.http.get<IVisitor[]>(this.apiUrl + `/getAllVisitor`);
  }

  addVisitor(visitor: IVisitor): Observable<IVisitor> {
    return this.http.patch<IVisitor>(this.apiUrl + `/addVisitor`, visitor);
  }

}
