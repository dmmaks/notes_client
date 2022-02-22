import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieStorageService } from '../_helpers/cookies.storage';
import { Account } from '../_models/account';
import { Token } from '../_models/token';
import { User } from '../_models/user';

const baseUrl = `${environment.serverUrl}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accountSubject: BehaviorSubject<Account | null>;
  public account: Observable<Account | null>;

  constructor(
    private http: HttpClient,
    private cookie:CookieStorageService,
    private jwt: JwtHelperService,
    private router: Router
  ) {
    const token = this.cookie.getToken();
  if(token && !this.jwt.isTokenExpired(token)){
    const tokenData = this.jwt.decodeToken(token);
    this.accountSubject = new BehaviorSubject<Account | null>({email: tokenData.sub, role: tokenData.auth, token: token});
    }
    else
      this.accountSubject = new BehaviorSubject<Account | null>(null);
    this.account = this.accountSubject.asObservable();
  }

  forgotPassword(email: string): Observable<Object> {
    let httpParams = new HttpParams().set('email', email);
    const httpOptions = {
      params: httpParams
    };
    return this.http.post(`${baseUrl}/password/resetlink`,{}, httpOptions);
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

validateResetToken(token: string): Observable<Object> {
  let reqParams = new HttpParams().set('token', token);
  return this.http.get(`${baseUrl}/password/reset`, { params: reqParams });
}

resetPassword(token: string, password: string, confirmPassword: string): Observable<Object> {
  return this.http.put(`${baseUrl}/password/reset`, { token, password, confirmPassword });
}

validateConfirmToken(token: string): Observable<Object> {
  let reqParams = new HttpParams().set('token', token);
  return this.http.get(`${baseUrl}/password/creation`, { params: reqParams });
}

  confirmModerator(token: string, password: string, confirmPassword: string): Observable<Object> {
  return this.http.put(`${baseUrl}/password/creation`, { token, password, confirmPassword });
}

public get accountValue() : Account | null {
  return this.accountSubject.value;
}

}
