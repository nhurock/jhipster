import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { SERVER_API_URL, CLIENT_ID, OAUTH2_GRANT_TYPE } from 'app/app.constants';
import { Login } from 'app/core/login/login.model';

type JwtToken = {
  // id_token: string;
  access_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {}

  getToken(): string {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
  }

  login(credentials: Login): Observable<void> {
    // return this.http
    //   .post<JwtToken>(SERVER_API_URL + 'api/authenticate', credentials)
    //   .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));

    const body = new HttpParams()
      .set('client_id', CLIENT_ID)
      .set('grant_type', OAUTH2_GRANT_TYPE)
      .set('username', credentials.username)
      .set('password', credentials.password);
    return this.http.post<JwtToken>(SERVER_API_URL + 'login', body).pipe(map(response => this.authenticateSuccess(response, true)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    // const jwt = response.id_token;
    const jwt = response.access_token;
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
    }
  }
}
