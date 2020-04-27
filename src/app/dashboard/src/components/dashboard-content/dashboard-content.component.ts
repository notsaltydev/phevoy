import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConferenceDto, ScheduleDto } from '../../../../schedule/src/models';
import { ScheduleService } from '../../../../schedule/src/services/schedule';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { NbDialogService } from '@nebular/theme';
import { ConferenceDialogComponent } from '../conference-dialog';
import { filter, switchMap } from 'rxjs/operators';

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

    open(type: 'create' | 'update', conference?: ConferenceDto) {
        let editedConference: any;

        if (editedConference) {
            editedConference = {
                name: conference.name || null,
                startDate: new Date(conference.startDate) || null,
                endDate: new Date(conference.endDate) || null,
                description: conference.description || null,
            };
        }

        this.dialogService.open(ConferenceDialogComponent, {
            context: {
                title: `${type} Schedule conference`,
                ...editedConference
            },
        }).onClose
            .pipe(
                filter((data: any | null) => data)
            ).subscribe((payload: ConferenceDto) => {
            if (type === 'create') {
                this.createSchedule(payload);
            } else if (type === 'update') {
                this.updateSchedule(conference.id, payload);
            }
        });
    }

    private createSchedule(conference: ConferenceDto): void {
        const conferenceDate: string = new Date(conference.startDate).toISOString().split('T')[0];
        const selectedSchedule: ScheduleDto | null = this.schedules.find((schedule: ScheduleDto) => {
            const scheduleDate: string = schedule.date;

            return scheduleDate === conferenceDate;
        });

        if (selectedSchedule) {
            this.scheduleService.createConference(selectedSchedule.id, {
                ...conference
            }).subscribe((newConference: ConferenceDto) => {
                console.log('newConference', newConference);
            });
        } else {
            this.scheduleService.createSchedule({date: conferenceDate}).pipe(
                switchMap((schedule: ScheduleDto) => this.scheduleService.createConference(schedule.id, {
                    ...conference
                }))
            ).subscribe((newConference: ConferenceDto) => {
                console.log('newConference', newConference);
            });
        }
    }

    private updateSchedule(id: string, conference: ConferenceDto) {
        this.scheduleService.updateConference(id, {
            ...conference,
            id
        }).subscribe((newConference: ConferenceDto) => {
            console.log('newConference', newConference);
        });
    }
}
