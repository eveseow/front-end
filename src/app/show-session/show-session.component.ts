import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-session',
  templateUrl: './show-session.component.html',
  styleUrls: ['./show-session.component.css']
})
export class ShowSessionComponent implements OnInit {
  username: string;
  id;

  constructor(public sessionService: SessionService, public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.sessionService.currentMessage.subscribe(id => this.id = id)
  }

  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
