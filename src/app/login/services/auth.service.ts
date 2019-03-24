import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs/'

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  userDetails: firebase.User = null;

  userEmitter = new EventEmitter<firebase.User>(); 
  isLoggedIn = new EventEmitter<boolean>();
  isAdmin = new EventEmitter<boolean>();

  constructor(public auth: AngularFireAuth) { 
    this.user = auth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.isLoggedIn.emit(true);
        this.userDetails = user;
        console.log('user', user);
        this.userEmitter.emit(this.userDetails);
        if (user.uid == 'jIBEovwKsVdUYOYvoqNcdaxIKXu2') {
          this.isAdmin.emit(true);
        } else {
          this.isAdmin.emit(false);
        }
      } else {
        this.isLoggedIn.emit(false);
        this.isAdmin.emit(false);
      }
    });
  }

  loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
     return this.authLogin(provider);
  }

  authLogin(provider) {
      return this.auth.auth.signInWithPopup(provider);
  }

  logout() {
    return this.auth.auth.signOut();
  }
}