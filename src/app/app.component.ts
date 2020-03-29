import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser: User;
  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(this.authenticationService.currentUser.subscribe(user => this.currentUser = user));
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
