import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupsService {

  constructor(private http : HttpClient) { }

  signUp(name , username , email , phone , password , role):Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/auth/registerUser' , {username, email, name, phone, password , role});
  }
}
