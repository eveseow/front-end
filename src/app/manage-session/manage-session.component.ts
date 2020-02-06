import { Component, OnInit } from '@angular/core';
import { Session } from '../models/session.model';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

import { interval } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-manage-session',
  templateUrl: './manage-session.component.html',
  styleUrls: ['./manage-session.component.css']
})
export class ManageSessionComponent implements OnInit {
  username: string;

  isCollapsed = false;
  scrollConfig = false;
  loading = false;
  result;
  spresp: any;

  status = [];
  public sessionList: Session[] = [];

  constructor(public sessionService: SessionService, public router: Router, private notification: NzNotificationService) { }

  ngOnInit() {
    this.sessionService.loadSession()
      .subscribe((result) => {
        this.sessionList = this.sessionService.getSession();
          
        for (var i = 0; i < this.sessionList.length; i++) {
          // console.log(this.sessionList[i].session_status)
          this.status.push(this.sessionList[i].session_status);

          if (this.status[i] === "true") {
            this.status[i] = true;
          }
          else if (this.status[i] === "false") {
            this.status[i] = false;
          }
        }
        this.status.reverse();
        console.log(this.sessionList);
      })

    let subscription = interval(5000)
      .subscribe((result) => {
        this.sessionService.loadSession()
      .subscribe((result) => {
        this.sessionList = this.sessionService.getSession();
        console.log(this.sessionList)
        
        for (var i = 0; i < this.sessionList.length; i++) {
          // console.log(this.sessionList[i].session_status)
          this.status.push(this.sessionList[i].session_status);

          if (this.status[i] === "true") {
            this.status[i] = true;
          }
          else if (this.status[i] === "false") {
            this.status[i] = false;
          }
        }
      })
    });

    this.sessionService.sessionAdded
      .subscribe(() => {
        this.sessionList = this.sessionService.getSession();
      })

    this.status.reverse();
    console.log(this.status)

  }

  clickSwitch(i): void {
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.sessionList.reverse();
        let currentSess = this.sessionList.slice()
        this.sessionService.updateStatus(currentSess[i].session_id, !(currentSess[i].session_status))
        console.log(currentSess[i])
        this.createNotification('success', 'Status Successfully Changed!')
        this.loading = false;
      }, 1000);
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
