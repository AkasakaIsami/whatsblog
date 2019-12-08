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
