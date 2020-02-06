import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { CreateSessionComponent } from './create-session/create-session.component';
import { EnterPinComponent } from './enter-pin/enter-pin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageSessionComponent } from './manage-session/manage-session.component';
import { ShowSessionComponent } from './show-session/show-session.component';
import { WordComponent } from './word/word.component';
import { WordAddComponent } from './word/word-add/word-add.component';
import { WordListComponent } from './word/word-list/word-list.component';
import { WordcloudComponent } from './wordcloud/wordcloud.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ReversePipe } from './reverse.pipe';
import { RegisterComponent } from './register/register.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CreateSessionComponent,
    EnterPinComponent,
    HomeComponent,
    LoginComponent,
    ManageSessionComponent,
    ShowSessionComponent,
    WordComponent,
    WordAddComponent,
    WordListComponent,
    WordcloudComponent,
    ReversePipe,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
