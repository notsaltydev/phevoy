import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { UserService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getUserMe().subscribe(user => {
      this.loading = false;
      this.user = user;
    });
  }
}
