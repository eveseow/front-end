import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterPinComponent } from './enter-pin/enter-pin.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CreateSessionComponent } from './create-session/create-session.component';
import { ShowSessionComponent } from './show-session/show-session.component';
import { ManageSessionComponent } from './manage-session/manage-session.component';
import { HomeComponent } from './home/home.component';
import { WordComponent } from './word/word.component';
import { WordcloudComponent } from './wordcloud/wordcloud.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/enter', pathMatch: 'full' },
  { path: 'enter', component: EnterPinComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, 
    children: [
      { path: 'create', component: CreateSessionComponent },  
      { path: 'show', component: ShowSessionComponent }, 
      { path: 'manage', component: ManageSessionComponent }, 

  ]},
  { path: 'home', component: HomeComponent, 
    children: [
      { path: 'word', component: WordComponent },
      { path: ':session_id/wordcloud', component: WordcloudComponent }
  ]},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
