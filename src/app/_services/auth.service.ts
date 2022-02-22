import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieStorageService } from '../_helpers/cookies.storage';
import { Token } from '../_models/token';
import { User } from '../_models/user';

const baseUrl = `${environment.serverUrl}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookie:CookieStorageService,
    private jwt: JwtHelperService,
    private router: Router
  ) {
  }

  signIn(username: string, password: string): Observable<Token> {
    let reqParams = new HttpParams().set('username', username).set('password', password);
    return this.http.post<Token>(`${environment.serverUrl}/login`, {}, { withCredentials: true, params: reqParams });
  }

logout(): void{
  this.cookie.clear();
  this.router.navigateByUrl('/login');
}

signUp(user: User): Observable<Object> {
  return this.http.post(`${environment.serverUrl}/register`, user);
}

}
