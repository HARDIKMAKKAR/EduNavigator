import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { UpdatesComponent } from './updates/updates.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HachathonsComponent } from './hachathons/hachathons.component';
import { JobsComponent } from './jobs/jobs.component';
import { ComputerEnggComponent } from './computer-engg/computer-engg.component';
import { DsaComponent } from './dsa/dsa.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { TechnewsComponent } from './technews/technews.component';
import { TestingComponentComponent } from './testing-component/testing-component.component';
import { ExamComponent } from './exam/exam.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { ProfileComponent } from './resume/profile/profile.component';
import { EducationComponent } from './resume/education/education.component';
import { WorkComponent } from './resume/work/work.component';
import { SkillsComponent } from './resume/skills/skills.component';
import { ProjectsComponent } from './resume/projects/projects.component';
import { AwardsComponent } from './resume/awards/awards.component';
import { PreviewComponent } from './preview/preview.component';
import { DiscussComponent } from './discuss/discuss.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ChatbotComponent,
    UpdatesComponent,
    SignupComponent,
    LoginComponent,
    PagenotfoundComponent,
    HachathonsComponent,
    JobsComponent,
    ComputerEnggComponent,
    DsaComponent,
    TechnewsComponent,
    TestingComponentComponent,
    ExamComponent,
    ResumeBuilderComponent,
    ProfileComponent,
    EducationComponent,
    WorkComponent,
    SkillsComponent,
    ProjectsComponent,
    AwardsComponent,
    PreviewComponent,
    DiscussComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [provideHttpClient(), provideFirebaseApp(() => initializeApp({"projectId":"edunavigator-dc324","appId":"1:721945582908:web:f1d0e256a04e4b59645239","databaseURL":"https://edunavigator-dc324-default-rtdb.firebaseio.com","storageBucket":"edunavigator-dc324.firebasestorage.app","apiKey":"AIzaSyC_M7LPPB_maegAUszypFRrKCaj_OolyUI","authDomain":"edunavigator-dc324.firebaseapp.com","messagingSenderId":"721945582908","measurementId":"G-R3ZLFL09V0"})), provideAuth(() => getAuth()), provideDatabase(() => getDatabase()), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent]
})
export class AppModule { }
