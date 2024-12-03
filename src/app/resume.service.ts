import { Injectable } from '@angular/core';
import { ResumeData } from './resume.modal';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  resumeData = {
    profile: {
      name:'',
      email:'',
      phone:''
    },
    education: [],
    work: [],
    skills: [],
    projects: [],
    awards: []
  };

  updateProfile(data: any) {
    this.resumeData.profile = data;
  }

  updateAwards(data: any[]) {
    this.resumeData.awards = data;
  }

  // Add similar methods for other sections
}
