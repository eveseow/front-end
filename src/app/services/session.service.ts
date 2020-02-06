import { Injectable, EventEmitter } from '@angular/core';
import { Session } from '../models/session.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  id;

  status = [];
  
  sessionUpdated = new EventEmitter<Session>();
  statusUpdated = new EventEmitter<void>();
  sessionAdded = new EventEmitter<void>();
  private sessionList: Session[] = [];

  private sessionURL = "http://localhost:3000/api/session/"

  constructor(public httpClient: HttpClient) { }

  private messageSource = new BehaviorSubject(
    this.id = this.randomString(6)
  );
  currentMessage = this.messageSource.asObservable();

  randomString(length) {
    var chars = '0123456789'.split('');

    if (!length) {
      length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  loadSession() {
    return this.httpClient.get<Session[]>(environment.sessURL)
      .pipe(
        map((session) => {
          this.sessionList = session;
          return session;
        },
          (error) => { console.log(error); })
      )
  }

  addSession(newInfo) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    });

    const options = {
      headers: httpHeaders
    };

    this.httpClient.post<Session>(environment.sessURL,
      { info: newInfo }, options)
      .subscribe((respone) => {
        this.sessionList.push(respone);
        this.sessionAdded.emit();
      })
  }

  updateStatus(session_id, updateInfo) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    })
    const options = {
      headers: httpHeaders
    }
    
    return this.httpClient.put<any>(environment.sessURL + session_id,
      {
        info:
        {
          'session_status': updateInfo

        }

      }, options)
      .subscribe((response) => {
        // this.loadJobs();
      })



  }

  getSession() {
    return this.sessionList.slice();
  }

  selectSession(session_id: number) {
    const result = this.sessionList.find((elem) => {
        return (elem.session_id == session_id);
    });

    if (result != undefined) {
        this.sessionUpdated.emit(result);
    }
    return result;
}


}
