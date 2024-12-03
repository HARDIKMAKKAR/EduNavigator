import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../../resume.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  workForm: FormGroup;
  newWork = {
    title: '',
    company: '',
    startYear: '',
    endYear: '',
    descriptions:['']
  };

  constructor(private fb: FormBuilder,public resumeService: ResumeService) {}

  ngOnInit() {
    // Initialize the form with FormBuilder
    this.workForm = this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: [''],
      descriptions: this.fb.array(['']) // Start with one empty description
    });
  }
  get descriptions(): FormArray {
    return this.workForm.get('descriptions') as FormArray;
  }

  addWork() {
    if (this.workForm.valid) {
      // Log the form values to the console
      console.log('Work Data:', this.workForm.value);
      
      // Push the work data to the resume service
      this.resumeService.resumeData.work.push(this.workForm.value);
      
      // Reset the form after submitting
      this.workForm.reset({
        title: '',
        company: '',
        startYear: '',
        endYear: '',
        descriptions: [''] // Reset descriptions to have one empty field
      });
    } else {
      console.log('Form is not valid');
    }
  }
  addDescription() {
    this.descriptions.push(this.fb.control('')); // Add a new empty description field
  }
  removeDescription(index: number) {
    this.descriptions.removeAt(index); // Remove the specified description field
  }


  removeWork(index: number) {
    this.resumeService.resumeData.work.splice(index, 1);
  }
}
