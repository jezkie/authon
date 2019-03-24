import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private isLogin: boolean;
  private loginLbl: string = 'Login';
  private userDetails: firebase.User = null;

  constructor(private authService: AuthService, private zone: NgZone) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(loggedIn => {
      this.isLogin = loggedIn;
    });
    this.authService.userEmitter.subscribe(user => {
      this.userDetails = user;
    });
  }

  logout() {
    this.authService.logout().then(res => {
      this.zone.run(() => {
        console.log('User logged out.')
      })
    });
  }

  login() {
    this.authService.loginWithFacebook().then(res => {
      this.zone.run(() => {
        console.log('User logged in.');
      });
    });
  }
}