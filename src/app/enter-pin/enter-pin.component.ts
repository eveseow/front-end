import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Session } from '../models/session.model';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-enter-pin',
  templateUrl: './enter-pin.component.html',
  styleUrls: ['./enter-pin.component.css']
})
export class EnterPinComponent implements OnInit {
  sessID;
  sessName;
  sessDesc;
  question;
  enterPIN: number;
  pinList = [];

  sessionList: Session[] = [];
  returnUrl: string;
  FailedMsg = 'Wrong PIN Number!'

  currentSession;

  constructor(public sessionService: SessionService, public router: Router, private notification: NzNotificationService, ) { }

  ngOnInit() {
    this.sessionService.loadSession()
      .subscribe((result) => {
        this.sessionList = this.sessionService.getSession();

        for (var i = 0; i < this.sessionList.length; i++) {
          this.pinList.push(this.sessionList[i].session_key)
        }
      });

    console.log(this.pinList)
    this.returnUrl = '/home/word';
  }

  enter() {

    for (var z = 0; z < this.sessionList.length; z++) {
      if ((this.enterPIN === this.sessionList[z].session_key) && (this.sessionList[z].session_status === true)) {
        this.currentSession = "true";
      }
    }

    if (this.currentSession === "true") {
      for (var i = 0; i < this.sessionList.length; i++) {
        if (this.enterPIN === this.sessionList[i].session_key) {
          this.sessID = this.sessionList[i].session_id;
          this.sessName = this.sessionList[i].session_name;
          this.sessDesc = this.sessionList[i].session_description;
          this.question = this.sessionList[i].question;
          console.log(this.sessID)
        }
      }

      console.log("This existssss")
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('tokenPIN', this.enterPIN.toString());
      localStorage.setItem('tokenID', this.sessID.toString());
      localStorage.setItem('tokenName', this.sessName);
      localStorage.setItem('tokenDesc', this.sessDesc);
      localStorage.setItem('tokenQ', this.question);


      this.router.navigate([this.returnUrl])

      this.createNotification('success', 'Room Entered!')
    }
    else {
      this.createNotification('error', 'Failed to Enter Room!');
    }
  }

  createNotification(type: string, msg): void {
    this.notification.create(
      type,
      msg,
      ''
    );
  }
}
