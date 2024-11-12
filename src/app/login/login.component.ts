import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';

interface signInResponse {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private http : HttpClient,
    private auth  : AuthService
  ){}
  ngOnInit(): void {
    
  }
  emaill : string = '';
  passwordd : string = '';

  SignInUser(){
    this.auth.signIn(this.emaill,this.passwordd);
  }
}
