import { Component, Output, EventEmitter } from '@angular/core';
import { validatePassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../../resume.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
 
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private resumeService: ResumeService) {
    // Initialize the form with validation
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      link: ['', Validators.required]
    });
  }

  submit() {
    if (this.profileForm.valid) {
      // Update the profile data in the service
      this.resumeService.resumeData.profile = this.profileForm.value;
      console.log('Profile Data Submitted:', this.profileForm.value);

      // Optionally reset the form after submission
      this.profileForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}

