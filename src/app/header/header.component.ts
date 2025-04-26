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
    this.auth.isLoggedIn$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  
    // Trigger the check once on init
    this.auth.checkForSignedInUser();
  }

  logOut(){
    localStorage.removeItem('EduNavToken');
    this.auth.checkForSignedInUser();
    
  }
  // To track whether the dropdown is open or closed

  // Method to toggle dropdown visibility

 
 
    isNavbarOpen = false;
    isDropdownOpen = false;
    
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    }
  
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  
    closeDropdown() {
      this.isDropdownOpen = false;
    }
  
  
}
