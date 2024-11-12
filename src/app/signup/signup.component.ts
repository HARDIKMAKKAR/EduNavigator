import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/authService';

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

  constructor(private http : HttpClient,
    private auth : AuthService
  ){}
  emaill : string = '';
  passwordd : string = '';

  signUpUser(){
    this.auth.register(this.emaill,this.passwordd);
  }
}
