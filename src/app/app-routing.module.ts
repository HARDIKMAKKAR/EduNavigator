import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { UpdatesComponent } from './updates/updates.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
const routes: Routes = [
  {path : '', redirectTo : 'home',pathMatch: 'full'},
  {path : 'home' , component :  HomeComponent},
  {path : 'chatbot' , component :  ChatbotComponent},
  {path : 'updates' , component :  UpdatesComponent},
  {path : 'signup' , component :  SignupComponent},
  {path : 'login' , component :  LoginComponent},
  {path : '**', component : PagenotfoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
