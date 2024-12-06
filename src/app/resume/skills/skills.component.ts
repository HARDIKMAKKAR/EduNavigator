import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ResumeService } from '../../resume.service'; // Import the service

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillForm: FormGroup;

  constructor(private fb: FormBuilder, public resumeService: ResumeService) {
    // Initialize the form
    this.skillForm = this.fb.group({
      skills: this.fb.array([]) // FormArray for skills
    });
  }

  ngOnInit() {
    this.loadExistingSkills(); // Load existing skills if needed
  }

  // Load existing skill data
  private loadExistingSkills() {
    this.resumeService.resumeData.skills.forEach(skill => {
      this.skills.push(this.createSkillEntry(skill));
    });
  }

  // Create a new skill entry FormGroup
  private createSkillEntry(skill?: any): FormGroup {
    return this.fb.group({
      name: [skill?.name || '', Validators.required], // Skill name
      description: [skill?.description || ''] // Skill description
    });
  }

  // Get the skills FormArray
  get skills(): FormArray {
    return this.skillForm.get('skills') as FormArray;
  }

  // Add a new skill entry
  addSkill() {
    this.skills.push(this.createSkillEntry());
  }

  // Remove a skill entry
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // Submit the form
  submitSkills() {
    if (this.skillForm.valid) {
      this.resumeService.resumeData.skills = this.skillForm.value.skills;
      console.log('Skills Data Submitted:', this.skillForm.value.skills);
      // Optionally reset the form after submission
      this.skillForm.reset();
      while (this.skills.length) {
        this.skills.removeAt(0);
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
