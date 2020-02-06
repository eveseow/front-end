import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: User = new User("", "");
  userList : User[] = []
  validateForm: FormGroup;
  returnUrl: string;

  username;
  password;
  usernameList = [];
  passwordList = [];

  message: string;
  FailedMsg = 'Login Unsuccessful!'

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder, public router: Router, private notification: NzNotificationService, public authService: AuthService) { }

  ngOnInit() {

    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    this.returnUrl = '/admin/create';
    this.authService.logout();

    this.authService.loadUser()
      .subscribe((result) => {
        this.userList = this.authService.getUser();
      });

  }

  login() {
    // stop here if form is invalid
    if (this.validateForm.invalid) {
      return;
    }
    else {
      this.usernameList = this.userList.map(t => t.username)
      this.passwordList = this.userList.map(t => t.password)

      if(this.usernameList.includes(this.username) && this.passwordList.includes(this.password)){
        console.log("Login successful");
        //this.authService.authLogin(this.model);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.username);
        this.router.navigate([this.returnUrl]);

        this.createNotification('success', 'Login Success')
      }
      else {
        this.message = "Please check your username and password";
        this.createNotification('error', this.FailedMsg);
      }
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
