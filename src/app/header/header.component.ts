import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  constructor(private auth : AuthService){}
  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.isAuthenticated = !! user;
    });
  }

  logOut(){
    this.auth.signOut();
  }
}
