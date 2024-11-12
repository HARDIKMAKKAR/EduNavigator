import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Route, Router } from "@angular/router";
import { Observable } from "rxjs";
@Injectable({providedIn : 'root'})
export class AuthService{

  user$ : Observable<any>;
  constructor(private fireAuth : AngularFireAuth ,
    private route : Router
  ){
    this.user$ = fireAuth.authState;
  }

  signIn(email : string , password : string){
    this.fireAuth.signInWithEmailAndPassword(email , password) .then( () =>{
        localStorage.setItem('token' , 'true');
        alert('sign in successfull');
    } , error => {
        alert(error.message);
    });
  }


  register(email : string , password : string){
    this.fireAuth.createUserWithEmailAndPassword(email , password).then( () =>{
        alert('Successfully registered');
    },error => {
        alert(error.message);
    });
  }

  signOut(){
    this.fireAuth.signOut().then(()=>{
        localStorage.removeItem('token');
        this.route.navigate(['/home']);
    } , error => {
        alert(error.message);
    })
  }
}