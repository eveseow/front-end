import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { WordService } from '../services/word.service';
import { Word } from '../models/word.model';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  sessionSelected = 0;

  enterPIN: string;
  sessID: string;
  sessName: string;
  sessDesc: string;
  sessQ: string;
 
  ID: number;
  name: string;
  description: string;
  question: string;

  wordList: Word[] = [];
  sessionWordList: Word[] = [];

  constructor(private router: Router, public authService: AuthService, public wordService: WordService, public http: HttpClient, private notification: NzNotificationService) { }

  ngOnInit() {
    this.enterPIN = localStorage.getItem('tokenPIN');
    this.sessID = localStorage.getItem('tokenID');
    this.sessName = localStorage.getItem('tokenName');
    this.sessDesc = localStorage.getItem('tokenDesc');
    this.sessQ = localStorage.getItem('tokenQ');

    this.ID = parseInt(this.sessID);
    this.name = this.sessName;
    this.description = this.sessDesc;
    this.question = this.sessQ;
    console.log(this.description)

  }

  exit(): void {
    console.log("Logout");
    this.authService.logout();
    this.createNotification('success', 'Successfully Exited!')
    this.router.navigate(['/enter']);
  }

  viewWordCloud() {
    this.router.navigate(['/home/' + this.ID + '/wordcloud'])

  }

  createNotification(type: string, msg): void {
    this.notification.create(
      type,
      msg,
      ''
    );
  }

}
