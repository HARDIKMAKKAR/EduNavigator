import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ResumeService } from '../../resume.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educationForm: FormGroup;

  constructor(private fb: FormBuilder, public resumeService: ResumeService) {
    // Initialize the form
    this.educationForm = this.fb.group({
      educationEntries: this.fb.array([]) // Start with an empty FormArray
    });
  }

  ngOnInit() {
    // Load existing education data if needed
    this.resumeService.resumeData.education.forEach(edu => {
      this.educationEntries.push(this.createEducationEntry(edu));
    });
  }

  // Create a new education entry FormGroup
  createEducationEntry(edu?: any): FormGroup {
    return this.fb.group({
      degree: [edu?.degree || '', Validators.required],
      field: [edu?.field || ''],
      institution: [edu?.institution || '', Validators.required],
      location: [edu?.location || '', Validators.required],
      year: [edu?.year || '', [Validators.required, Validators.pattern('^[0-9]{4}$')]] // Year must be 4 digits
    });
  }

  // Get the education entries FormArray
  get educationEntries(): FormArray {
    return this.educationForm.get('educationEntries') as FormArray;
  }

  // Add a new education entry
  addEducation() {
    this.educationEntries.push(this.createEducationEntry());
  }

  // Remove an education entry
  removeEducation(index: number) {
    this.educationEntries.removeAt(index);
  }

  // Submit the form
  submitEducation() {
    if (this.educationForm.valid) {
      // Update the education data in the service
      this.resumeService.resumeData.education = this.educationForm.value.educationEntries;
      console.log('Education Data Submitted:', this.educationForm.value.educationEntries);
      
      // Optionally reset the form after submission
      this.educationForm.reset();
      // Reset the education entries array
      while (this.educationEntries.length) {
        this.educationEntries.removeAt(0);
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
