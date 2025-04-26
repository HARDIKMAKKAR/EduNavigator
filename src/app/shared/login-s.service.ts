import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { login } from './loginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginSService {

  constructor(
    private http : HttpClient
  ) { }
  baseUrl : 'http://localhost:3000/api/auth'

  loginConsole(username , password):Observable<login>{
    return this.http.post<login>(`http://localhost:3000/api/auth/login`, { username, password });
  }
  decodeToken(userTok):Observable<any>{
    const headers = new HttpHeaders().set('authorization' , `${userTok}`);
    return this.http.get<any>(`http://localhost:3000/api/auth/tokenVal`, {headers});
  }
}
