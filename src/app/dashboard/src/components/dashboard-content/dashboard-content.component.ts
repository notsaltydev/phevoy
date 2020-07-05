import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConferenceDto } from '../../models/conference.dto';
import { ConferenceService } from '../../services/conference';
import { NbDialogService } from '@nebular/theme';
import { ConferenceDialogComponent } from '../conference-dialog';
import { filter, map } from 'rxjs/operators';
import { conferenceDtoToConferenceList } from '../../mappers';
import { isAfter, isToday, isTomorrow } from 'date-fns';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-dashboard-content',
    templateUrl: './dashboard-content.component.html',
    styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit {
    conferenceList: { [id: string]: ConferenceDto[] };
    dates: string[];
    today: Date = new Date();

    constructor(
        private scheduleService: ConferenceService,
        private changeDetectorRef: ChangeDetectorRef,
        private dialogService: NbDialogService,
        private router: Router,
        private datePipe: DatePipe
    ) {
    }

    ngOnInit(): void {
        this.scheduleService.getConferences()
            .pipe(
                map((confs: ConferenceDto[]) => confs.filter((conference: ConferenceDto) =>
                    isAfter(conference.startDate, new Date()) || isToday(conference.startDate))
                ),
                map(conferenceDtoToConferenceList)
            )
            .subscribe((conferences: { [id: string]: ConferenceDto[] }) => {
                this.conferenceList = conferences;
                this.dates = Object.keys(conferences).sort((a: string, b: string) => Date.parse(a) - Date.parse(b));
                this.changeDetectorRef.markForCheck();
            });
    }

    open(type: 'create' | 'update', conference?: ConferenceDto): void {
        let editedConference: any;

        if (type === 'update' && conference) {
            editedConference = {
                name: conference.name || null,
                startDate: new Date(conference.startDate) || null,
                endDate: new Date(conference.endDate) || null,
                description: conference.description || null,
            };
        }

        this.dialogService.open(ConferenceDialogComponent, {
            context: {
                title: `${type} conference`,
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

    delete(id: string): void {
        this.scheduleService.deleteConference(id).subscribe(() => {
        });
    }

    join(id: number): void {
        this.router.navigate(['/meet', id]);
    }

    formatDate(dateToFormat: string): string {
        const date: Date = new Date(dateToFormat);

        if (isToday(date)) {
            return 'Today';
        }
        if (isTomorrow(date)) {
            return 'Tomorrow';
        }

        return this.datePipe.transform(date, 'fullDate');
    }

    private createSchedule(conference: ConferenceDto): void {
        this.scheduleService.createConference({
            ...conference
        }).subscribe((newConference: ConferenceDto) => {
            const date: string = new Date(newConference.startDate).toISOString().split('T')[0];

            if (!this.conferenceList[date]) {
                this.conferenceList[date] = [];
            }

            this.conferenceList[date].push(newConference);
        });
    }

    private updateSchedule(id: string, conference: ConferenceDto): void {
        this.scheduleService.updateConference(id, {
            ...conference,
            id
        }).subscribe((newConference: ConferenceDto) => {
        });
    }

}
