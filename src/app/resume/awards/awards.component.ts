import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ResumeService } from '../../resume.service'; // Import the service

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {
  awardForm: FormGroup;

  constructor(private fb: FormBuilder, public resumeService: ResumeService) {
    // Initialize the form
    this.awardForm = this.fb.group({
      awardEntries: this.fb.array([]) // Start with an empty FormArray
    });
  }

  ngOnInit() {
    // Load existing awards data if needed
    this.resumeService.resumeData.awards.forEach(award => {
      this.awardEntries.push(this.createAwardEntry(award));
    });
  }

  // Create a new award entry FormGroup
  createAwardEntry(award?: any): FormGroup {
    return this.fb.group({
      title: [award?.title || '', Validators.required],
      organization: [award?.organization || '', Validators.required],
      year: [award?.year || '', [Validators.required, Validators.pattern('^[0-9]{4}$')]], // Year must be 4 digits
      description: [award?.description || '']
    });
  }

  // Get the award entries FormArray
  get awardEntries(): FormArray {
    return this.awardForm.get('awardEntries') as FormArray;
  }

  // Add a new award entry
  addAward() {
    this.awardEntries.push(this.createAwardEntry());
  }

  // Remove an award entry
  removeAward(index: number) {
    this.awardEntries.removeAt(index);
  }

  // Submit the form
  submitAwards() {
    if (this.awardForm.valid) {
      // Update the awards data in the service
      this.resumeService.resumeData.awards = this.awardForm.value.awardEntries;
      console.log('Awards Data Submitted:', this.awardForm.value.awardEntries);
      
      // Optionally reset the form after submission
      this.awardForm.reset();
      // Reset the award entries array
      while (this.awardEntries.length) {
        this.awardEntries.removeAt(0);
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
