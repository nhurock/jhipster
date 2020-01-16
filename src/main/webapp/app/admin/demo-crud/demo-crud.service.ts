import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoCRUDService {
  constructor(private http: HttpClient, private router: Router) {}

  public fetch(body: any): Observable<any> {
    return this.http.post<any>('usermanager/users', body);
  }

  public create(body: any): Observable<any> {
    return this.http.post<any>('usermanager/users/add', body);
  }

  public update(body: any): Observable<any> {
    return this.http.post<any>('usermanager/users/update', body);
  }
}
