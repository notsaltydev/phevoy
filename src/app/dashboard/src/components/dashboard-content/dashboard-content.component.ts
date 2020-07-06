import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ConferenceDto } from '../../models/conference.dto';
import { NbDialogService } from '@nebular/theme';
import { ConferenceDialogComponent } from '../conference-dialog';
import { filter, map, takeUntil } from 'rxjs/operators';
import { conferenceDtoToConferenceList } from '../../mappers';
import { isAfter, isToday, isTomorrow } from 'date-fns';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { AppState } from '../../../../store/reducers';
import { Store } from '@ngrx/store';
import { getAllConferences } from '../../store/selectors/conference.selector';
import { conferenceActionTypes } from '../../store/actions/conference.action';
import { Update } from '@ngrx/entity';
import { v4 } from 'uuid';

@Component({
    selector: 'app-dashboard-content',
    templateUrl: './dashboard-content.component.html',
    styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit, OnDestroy {
    conferenceList: { [id: string]: ConferenceDto[] };
    dates: string[];
    today: Date = new Date();

    private conferences$: Observable<ConferenceDto[]>;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private dialogService: NbDialogService,
        private router: Router,
        private datePipe: DatePipe,
        private store: Store<AppState>
    ) {
    }

    ngOnInit(): void {
        this.conferences$ = this.store.select(getAllConferences);
        this.conferences$
            .pipe(
                takeUntil(this.destroy$),
                map((conferences: ConferenceDto[]) => conferences.filter((conference: ConferenceDto) =>
                    isAfter(conference.startDate, new Date()) || isToday(conference.startDate))
                ),
                map(conferenceDtoToConferenceList)
            ).subscribe((conferences: { [id: string]: ConferenceDto[] }) => {
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
                takeUntil(this.destroy$),
                filter((data: any | null) => data)
            ).subscribe((payload: ConferenceDto) => {
            if (type === 'create') {
                this.createSchedule(payload);
            } else if (type === 'update') {
                this.updateSchedule(conference.id, payload);
            }
        });
    }

    delete(conferenceId: string): void {
        this.store.dispatch(conferenceActionTypes.deleteConference({conferenceId}));
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

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private createSchedule(submittedConference: ConferenceDto): void {
        const conference: ConferenceDto = {
            ...submittedConference,
            id: v4()
        };
        this.store.dispatch(conferenceActionTypes.createConference({conference}));
    }

    private updateSchedule(id: string, conference: ConferenceDto): void {
        const update: Update<ConferenceDto> = {
            id,
            changes: {
                ...conference,
                id
            }
        };

        this.store.dispatch(conferenceActionTypes.updateConference({update}));
    }

}
