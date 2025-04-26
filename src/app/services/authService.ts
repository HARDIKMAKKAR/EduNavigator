import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Route, Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { LoginSService } from "../shared/login-s.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService{


  isLoggedIn = false;
  user$ : Observable<any>;
  constructor(private fireAuth : AngularFireAuth ,
    private route : Router,
    private service : LoginSService
  ){
    this.user$ = fireAuth.authState;
  }
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  signIn(email : string , password : string){
    this.fireAuth.signInWithEmailAndPassword(email , password) .then( () =>{
        localStorage.setItem('token' , 'true');
        alert('sign in successfull');
        this.route.navigate(['home']);
    } , error => {
        alert(error.message);
    });
  }

  checkForSignedInUser(): void {
    const token = localStorage.getItem('EduNavToken');
    if (!token) {
      this.isLoggedInSubject.next(false);
      return;
    }

    this.service.decodeToken(token).subscribe(
      (res) => {
        const currentTime = Math.floor(Date.now() / 1000);
        const isValid = res?.data?.exp > currentTime;
        this.isLoggedInSubject.next(isValid);
      },
      () => {
        this.isLoggedInSubject.next(false);
      }
    );
  }

  // Optional: to expose current value directly
  get isAuthenticated(): boolean {
    return this.isLoggedInSubject.getValue();
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