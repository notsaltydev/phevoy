import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ConferenceDto } from '../../models/conference.dto';
import { map, takeUntil } from 'rxjs/operators';
import { conferenceDtoToConferenceList } from '../../mappers';
import { isBefore } from 'date-fns/fp';
import { getAllConferences } from '../../store/selectors/conference.selector';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducers';


@Component({
    selector: 'app-recent-content',
    templateUrl: './recent-content.component.html',
    styleUrls: ['./recent-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentContentComponent implements OnInit, OnDestroy {
    conferenceList: { [id: string]: ConferenceDto[] };
    dates: string[];

    private conferences$: Observable<ConferenceDto[]>;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private store: Store<AppState>,
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.conferences$ = this.store.select(getAllConferences);
        this.conferences$
            .pipe(
                takeUntil(this.destroy$),
                map((conference: ConferenceDto[]) => conference.filter((conf: ConferenceDto) => isBefore(new Date(), conf.startDate))),
                map(conferenceDtoToConferenceList),
            )
            .subscribe((conferences: { [id: string]: ConferenceDto[] }) => {
                this.conferenceList = conferences;
                this.dates = Object.keys(conferences).sort((a: string, b: string) => Date.parse(a) + Date.parse(b));
                this.changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
