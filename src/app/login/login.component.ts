import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';
import { LoginSService } from '../shared/login-s.service';
import { Router } from '@angular/router';

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
    private auth  : AuthService,
    private service : LoginSService,
    private router : Router
  ){}
  ngOnInit(): void {
    
  }
  username : string = '';
  password : string = '';

   token : string = '';
  SignInUser(){
    // this.auth.signIn(this.emaill,this.passwordd);
    this.service.loginConsole(this.username,this.password).subscribe(
      res=>{
        console.log(res);
        this.token=res.data;
        localStorage.setItem('EduNavToken' , this.token);
        this.service.decodeToken(this.token).subscribe(res=>{
          console.log('decode token api call');
          console.log(res);
          alert('SignIn Successfull!');
          this.router.navigateByUrl('/');
          this.auth.checkForSignedInUser();
        })
      }
    )
  }
}
