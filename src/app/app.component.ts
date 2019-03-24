import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscription: Subscription;

  constructor(private router: Router) {
    this.subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          console.log('Router navigated: ' + router.navigated, this.router.url);
        }
    });
   }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}