import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConferenceDto, ScheduleDto } from '../../../../schedule/src/models';
import { ScheduleService } from '../../../../schedule/src/services/schedule';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { NbDialogService } from '@nebular/theme';
import { ConferenceDialogComponent } from '../conference-dialog';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard-content',
    templateUrl: './dashboard-content.component.html',
    styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit {
    schedules: ScheduleDto[];
    faEdit: any = faEdit;
    isOpenedConferenceDialog: boolean = true;

    constructor(
        private scheduleService: ScheduleService,
        private changeDetectorRef: ChangeDetectorRef,
        private dialogService: NbDialogService
    ) {
    }

    ngOnInit() {
        this.scheduleService.getSchedules()
            .subscribe((schedules: ScheduleDto[]) => {
                this.schedules = schedules.sort((a: ScheduleDto, b: ScheduleDto) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                );
                this.changeDetectorRef.markForCheck();
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

    open() {
        this.dialogService.open(ConferenceDialogComponent, {
            context: {
                title: `Schedule conference`,
                name: null,
                startDate: null,
                endDate: null,
                description: null
            },
        }).onClose
            .pipe(
                filter((data: any | null) => data)
            ).subscribe((conference: ConferenceDto) => {
            this.createSchedule(conference);
        });
    }

    createSchedule(conference: ConferenceDto): void {
        const date: Date = new Date(conference.startDate);
        const selectedSchedule: ScheduleDto | null = this.schedules.find((schedule: ScheduleDto) => {
            const scheduleDate: Date = new Date(schedule.date);

            return scheduleDate.getDate() === date.getDate() &&
                scheduleDate.getMonth() === date.getMonth() &&
                scheduleDate.getFullYear() === date.getFullYear();
        });

        console.log('selectedSchedule', selectedSchedule);

        if (selectedSchedule) {
            this.scheduleService.createConference(selectedSchedule.id, {
                ...conference
            }).subscribe((newConference) => {
                console.log('newConference', newConference);
                selectedSchedule.conferences.push(newConference);
            });
        }
    }

    editConference(conference: ConferenceDto) {
        console.log('edit conference', conference);
        this.isOpenedConferenceDialog = true;
        this.changeDetectorRef.markForCheck();
    }
}
