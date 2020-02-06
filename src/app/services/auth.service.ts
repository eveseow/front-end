import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userAdded = new EventEmitter<void>();
  private userList: User[] = [];

  private URL = "http://localhost:3000/api/user";

  constructor(private httpClient: HttpClient) { }

  loadUser() {
    return this.httpClient.get<User[]>(environment.userURL)
      .pipe(
        map((user) => {
          this.userList = user;
          return user;
        },
          (error) => { console.log(error); })
      )
  }

  registerNewUser(newUser) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    });

    const options = {
      headers: httpHeaders
    };
    
    this.httpClient.post<User>(environment.userURL,
      { info: newUser }, options)
      .subscribe((respone) => {
        this.userList.push(respone);
        this.userAdded.emit();
      })
  }

  getUser() {
    return this.userList.slice();
  }

  authenticate(username, password) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<User>(this.URL,{headers}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username', username);
        return userData;
       }
     )

    );
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
  } 
}
