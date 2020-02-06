import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { Session } from '../models/session.model';
import { AuthService } from '../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
  username: string;
  
  validateForm: FormGroup;
  eventName: string;
  eventDesc: string;
  eventQuestion: string;
  eventCat: string;
  eventDate: string;
  id;
  returnUrl: string;

  sessionList: Session[] = [];

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder, private router: Router, public sessionService: SessionService, public authService: AuthService, private notification: NzNotificationService) { }

  ngOnInit() {
    this.sessionService.currentMessage.subscribe(id => this.id = id)

    this.validateForm = this.fb.group({
      eventName: [null, [Validators.required]],
      eventDesc: [null, [Validators.required]],
      eventQuestion: [null, [Validators.required]],
      eventCat: [null, [Validators.required]],
      eventDate: [null, [Validators.required]],
      remember: [true]
    });
    this.returnUrl = '/admin/create';
    this.authService.logout();

    this.sessionService.loadSession()
      .subscribe((result) => {
        this.sessionList = this.sessionService.getSession();
      })
  }

  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  addSession() {
      this.sessionService.addSession(new Session(
        this.sessionList.length + 1,
        this.id,
        this.eventName,
        this.eventDesc,
        this.eventQuestion,
        this.eventCat.toString(),
        new Date(),
        true
      ))
  
      this.router.navigate(['/admin/show'])
      this.createNotification('success', 'Session Successfully Created!')
  
    }

    createNotification(type: string, msg): void {
      this.notification.create(
        type,
        msg,
        ''
      );
    }

}
