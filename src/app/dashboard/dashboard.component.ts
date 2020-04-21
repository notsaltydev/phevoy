import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { UserService } from '../_services';
import { ScheduleService } from "../schedule/src/services/schedule";
import { ScheduleDto } from "../schedule/src/models";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    loading = false;
    user: User;
    schedules: ScheduleDto[];

    constructor(
        private userService: UserService,
        private scheduleService: ScheduleService
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
                console.log('schedules', schedules);
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
}
