import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';
import { Route, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { user } from '@angular/fire/auth';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrl: './resume-builder.component.css'
})
export class ResumeBuilderComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private route: Router,
    private afAuth: AngularFireAuth,
    public resumeService:ResumeService
  ) { }
  resumeData = {
    profile: {
      name:''
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
  ngOnInit(): void {
    
  }
}
