import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Auth } from '../model/auth';


const AUTH_API = 'http://localhost:9090/api/v1/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(auth: Auth): Observable<any> {
    return this.http.post(`${AUTH_API}authenticate`, auth, httpOptions);
  }

  register(user: any): Observable<User> {
    return this.http.post<User>(
      AUTH_API + 'register',
      user,
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', { }, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'refresh-token', {
      refreshToken: token
    }, httpOptions);
  }
}