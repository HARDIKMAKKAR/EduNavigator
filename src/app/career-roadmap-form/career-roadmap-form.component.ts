import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-career-roadmap-form',
  templateUrl: './career-roadmap-form.component.html',
  styleUrls: ['./career-roadmap-form.component.css']
})
export class CareerRoadmapFormComponent {
  careerForm: FormGroup;
  careerPath: string = '';
  
  careerOptions: string[] = ['Software Engineering', 'Data Science', 'AI & ML', 'Cybersecurity', 'Business Analyst'];
  selectedInterests: string[] = [];

  skillOptions: string[] = ['Problem Solving', 'Programming', 'Communication', 'Analytical Thinking'];

  constructor(private fb: FormBuilder) {
    this.careerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      marks: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      studyMode: ['Online', Validators.required],
      interests: [[]], // Store selected interests
    });

    // Dynamically add skill controls
    this.skillOptions.forEach(skill => {
      this.careerForm.addControl(skill, this.fb.control(1, [Validators.min(1), Validators.max(5)]));
    });
  }

  onCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedInterests.push(value);
    } else {
      this.selectedInterests = this.selectedInterests.filter(item => item !== value);
    }
    this.careerForm.patchValue({ interests: this.selectedInterests });
  }

  onSubmit() {
    if (this.careerForm.valid) {
      const formData = this.careerForm.value;
      this.careerPath = `Based on your interests in ${formData.interests.join(', ')}, academic marks (${formData.marks}%), and skills, we recommend exploring ${formData.interests[0]} as a potential career path.`;
    }
  }
}
