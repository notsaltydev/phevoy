import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConferenceDto } from '../../../../schedule/src/models';
import { ScheduleService } from '../../../../schedule/src/services/schedule';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { NbDialogService } from '@nebular/theme';
import { ConferenceDialogComponent } from '../conference-dialog';
import { filter, map } from 'rxjs/operators';
import { conferenceDtoToConferenceList } from '../../mappers';

@Component({
    selector: 'app-dashboard-content',
    templateUrl: './dashboard-content.component.html',
    styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit {
    conferenceList: { [id: string]: ConferenceDto[] };
    dates: string[];
    faEdit: any = faEdit;

    constructor(
        private scheduleService: ScheduleService,
        private changeDetectorRef: ChangeDetectorRef,
        private dialogService: NbDialogService
    ) {
    }

    ngOnInit() {
        this.scheduleService.getConferences()
            .pipe(map(conferenceDtoToConferenceList))
            .subscribe((conferences: { [id: string]: ConferenceDto[] }) => {
                this.conferenceList = conferences;
                this.dates = Object.keys(conferences).sort((a: string, b: string) => Date.parse(a) - Date.parse(b));
                this.changeDetectorRef.markForCheck();
            });
    }

    open(type: 'create' | 'update', conference?: ConferenceDto) {
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

    private updateSchedule(id: string, conference: ConferenceDto) {
        this.scheduleService.updateConference(id, {
            ...conference,
            id
        }).subscribe((newConference: ConferenceDto) => {
            console.log('newConference', newConference);
        });
    }
}
