import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Md5} from 'ts-md5';
import {config} from './config';
import { Response } from './model/response';
import { Token } from './model/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl = '/';
  private loginApiUrl = config.host + 'api/user/login';
  private registerApiUrl = config.host + 'api/user/register';

  constructor(private http: HttpClient) { }

  saveUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  getUsername(): string {
    return this.getToken ? localStorage.getItem('username') : null;
  }

  saveToken(token: Token, expireHours: number): void {
    const expireTime = new Date().getTime() + expireHours * 3600 * 1000;
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('token_expire_time', expireTime.toString());
  }

  getToken(): Token {
    const now = new Date().getTime();
    const expireTime = parseInt(localStorage.getItem('token_expire_time'));
    const token = JSON.parse(localStorage.getItem('token'));
    return now <= expireTime ? token : null;
  }

  login(username: string, password: string): Observable<Response<Token>> {
    password = Md5.hashStr(password).toString(); // hash the password
    return this.http.post<Response<Token>>(this.loginApiUrl, {
      'username': username,
      'password': password
    })
  }

  register(username: string, password: string): Observable<Response<Token>> {
    password = Md5.hashStr(password).toString(); // hash the password
    return this.http.post<Response<Token>>(this.registerApiUrl, {
      'username': username,
      'password': password
    })
  }
}
