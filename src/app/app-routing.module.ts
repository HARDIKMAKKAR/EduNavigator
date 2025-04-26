import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { UpdatesComponent } from './updates/updates.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HachathonsComponent } from './hachathons/hachathons.component';
import { JobsComponent } from './jobs/jobs.component';
import { DsaComponent } from './dsa/dsa.component';
import { TechnewsComponent } from './technews/technews.component';
import { TestingComponentComponent } from './testing-component/testing-component.component';
import { ExamComponent } from './exam/exam.component';
import { ComputerEnggComponent } from './computer-engg/computer-engg.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { ProfileComponent } from './resume/profile/profile.component';
import { EducationComponent } from './resume/education/education.component';
import { WorkComponent } from './resume/work/work.component';
import { SkillsComponent } from './resume/skills/skills.component';
import { ProjectsComponent } from './resume/projects/projects.component';
import { AwardsComponent } from './resume/awards/awards.component';
import { DiscussComponent } from './discuss/discuss.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { CareerRoadmapFormComponent } from './career-roadmap-form/career-roadmap-form.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
const routes: Routes = [
  {path : '', redirectTo : 'home' , pathMatch : 'full'},
  {path : 'home' , component :  HomeComponent},
  {path : 'chatbot' , component :  ChatbotComponent},
  {path : 'updates' , component :  UpdatesComponent},
  {path : 'discuss' , component :  DiscussComponent},
  {path : 'signup' , component :  SignupComponent},
  {path : 'login' , component :  LoginComponent},
  {path : 'technews' , component :  TechnewsComponent},
  {path : 'computer-engineering' , component : ComputerEnggComponent},
  {path : 'testing' , component :  TestingComponentComponent},
  {path : 'hackathon' , component :  HachathonsComponent}, 
  {path : 'exams' , component :  ExamComponent}, 
  {path : 'dsa' , component :  DsaComponent}, 
  {path : 'chat-room' , component :  ChatRoomComponent}, 
  {path:'time-table',component:TimeTableComponent},
  {path:'career-roadmap',component:CareerRoadmapFormComponent},
  {
    path: 'resume-builder',
    component: ResumeBuilderComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'education', component: EducationComponent },
      { path: 'work', component: WorkComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'awards', component: AwardsComponent },
    ]
  },
  {path : '**', component : PagenotfoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
