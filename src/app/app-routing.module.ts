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
const routes: Routes = [
  {path : '', redirectTo : 'home' , pathMatch : 'full'},
  {path : 'home' , component :  HomeComponent},
  {path : 'chatbot' , component :  ChatbotComponent},
  {path : 'updates' , component :  UpdatesComponent},
  {path : 'signup' , component :  SignupComponent},
  {path : 'login' , component :  LoginComponent},
  {path : 'technews' , component :  TechnewsComponent},
  {path : 'computer-engineering' , component : ComputerEnggComponent},
  {path : 'testing' , component :  TestingComponentComponent},
  {path : 'hackathon' , component :  HachathonsComponent}, 
  {path : 'exams' , component :  ExamComponent}, 
  {path : 'dsa' , component :  DsaComponent}, 
  {path : '**', component : PagenotfoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
