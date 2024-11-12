import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface signUpResponse {
  idToken : string , 
  email : string ,
  refreshToken : string,
  expiresIn : string ,
  localId : string
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private http : HttpClient){}
  emaill : string = '';
  passwordd : string = '';

  signUpUser(){
    let  data  =  {
      email : this.emaill,
      password : this.passwordd,
      returnSecureToken : true
    }
    this.http.post<signUpResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_M7LPPB_maegAUszypFRrKCaj_OolyUI' , data).subscribe(res =>{
      console.log(res);
    });
  }
}
