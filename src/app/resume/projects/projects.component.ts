import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ResumeService } from '../../resume.service'; // Import the service

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder, public resumeService: ResumeService) {
    // Initialize the form directly with controls
    this.projectForm = this.fb.group({
      projectEntries: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          description: [''],
          link: ['', [Validators.required, Validators.pattern('https?://.+')]],
          toolsUsed: this.fb.array([]) // Start with an empty FormArray for tools used
        })
      ])
    });
  }

  ngOnInit() {
    this.loadExistingProjects(); // Load existing projects if needed
  }

  // Load existing project data
  private loadExistingProjects() {
    this.resumeService.resumeData.projects.forEach(project => {
      this.projectEntries.push(this.fb.group({
        name: [project.name, Validators.required],
        description: [project.description],
        link: [project.link, [Validators.required, Validators.pattern('https?://.+')]],
        toolsUsed: this.fb.array(project.toolsUsed ? project.toolsUsed.map(tool => this.fb.control(tool)) : [])
      }));
    });
  }

  // Get the project entries FormArray
  get projectEntries(): FormArray {
    return this.projectForm.get('projectEntries') as FormArray;
  }

  // Get the tools used FormArray for a specific project entry
  getToolsUsed(index: number): FormArray {
    return this.projectEntries.at(index).get('toolsUsed') as FormArray;
  }

  // Add a new project entry
  addProject() {
    this.projectEntries.push(this.fb.group({
      name: ['', Validators.required],
      description: [''],
      link: ['', [Validators.required, Validators.pattern('https?://.+')]],
      toolsUsed: this.fb.array([])
    }));
  }

  // Remove a project entry
  removeProject(index: number) {
    this.projectEntries.removeAt(index);
  }

  // Add a tool used for a specific project
  addToolUsed(index: number) {
    this.getToolsUsed(index).push(this.fb.control('')); // Add an empty control for the new tool
  }

  // Remove a tool used for a specific project
  removeToolUsed(index: number, toolIndex: number) {
    this.getToolsUsed(index).removeAt(toolIndex);
  }

  // Submit the form
  submitProjects() {
    if (this.projectForm.valid) {
      this.resumeService.resumeData.projects = this.projectForm.value.projectEntries;
      console.log('Projects Data Submitted:', this.projectForm.value.projectEntries);
      // Optionally reset the form after submission
      this.projectForm.reset();
      while (this.projectEntries.length) {
        this.projectEntries.removeAt(0);
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
