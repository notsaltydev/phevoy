import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '../_services';
import { ScheduleService } from "../schedule/src/services/schedule";
import { ScheduleDto } from "../schedule/src/models";
import { Router } from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    loading = false;
    user: any;
    schedules: ScheduleDto[];

    constructor(
        private userService: UserService,
        private scheduleService: ScheduleService,
        // FIXME remove Auth Service.
        private authenticationService: AuthenticationService,
        // FIXME remove Router.
        private router: Router
    ) {
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getUserMe().subscribe(user => {
            this.loading = false;
            this.user = user;
        });
        this.scheduleService.getSchedules()
            .subscribe((schedules: ScheduleDto[]) => {
                this.schedules = schedules.sort((a: ScheduleDto, b: ScheduleDto) => new Date(a.date).getTime() - new Date(b.date).getTime());
            });
    }

    getDateFormatted(date: Date): string {
        return new Date(date).toDateString();
    }

    getStartDate(startDate: Date): string {
        const date: Date = new Date(startDate);
        return `${date.getHours()}:${date.getMinutes()}`;
    }

    getEndDate(endDate: Date): string {
        return '15m';
    }

    getAvatarUr() {
        return 'url("https://via.placeholder.com/150")';
    }

    logout(): void {
        this.authenticationService.logout()
        this.router.navigate(['/']);
    }
}
