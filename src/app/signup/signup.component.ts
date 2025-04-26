import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/authService';
import { SignupsService } from '../shared/signups.service';

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
    private auth : AuthService,
    private service : SignupsService
  ){}
  name : string = '';
  username : string = '';
  email : string = '';
  password : string = '';
  phone : string = '';
  role  = 'user';
  //password : string = '';
  confirmpassword : string = '';
  signUpUser(){
    if(this.name === ''){
      alert('Name is Required');
      return;
    }
    if(this.username === ''){
      alert('Username is Required');
      return;
    }
    if(this.email === ''){
      alert('Email is Required');
      return;
    }
    if(this.phone === ''){
      alert('Phone is Required');
      return;
    }
    if(this.password === ''){
      alert('Password is Required');
      return;
    }
    if(this.confirmpassword === ''){
      alert('Confirm Password is Required');
      return;
    }
    if(this.password != this.confirmpassword){
      alert('Passwords mismatched!!');
      return;
    }

    this.service.signUp(this.name , this.username , this.email , this.phone , this.password , this.role).subscribe(res=>{
      console.log(res);
    })
  }
}
