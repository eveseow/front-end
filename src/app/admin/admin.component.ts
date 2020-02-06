import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username: string;
  isCollapsed = false;
    
  constructor(private router: Router,public authService: AuthService, private notification: NzNotificationService) { }

  ngOnInit() {
    this.username = localStorage.getItem('token');
  }

  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.createNotification('success', 'Successfully Logged Out!')
    this.router.navigate(['/enter']);
  }

  createNotification(type: string, msg): void {
    this.notification.create(
      type,
      msg,
      ''
    );
  }

}
