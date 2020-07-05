import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConferenceDto } from '../../models/conference.dto';
import { ConferenceService } from '../../services/conference';
import { map } from 'rxjs/operators';
import { conferenceDtoToConferenceList } from '../../mappers';
import { isBefore } from 'date-fns/fp';


@Component({
    selector: 'app-recent-content',
    templateUrl: './recent-content.component.html',
    styleUrls: ['./recent-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentContentComponent implements OnInit {
    conferenceList: { [id: string]: ConferenceDto[] };
    dates: string[];

    constructor(
        private scheduleService: ConferenceService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.scheduleService.getConferences()
            .pipe(
                map((conference: ConferenceDto[]) => conference.filter((conf: ConferenceDto) => isBefore(new Date(), conf.startDate))),
                map(conferenceDtoToConferenceList),
            )
            .subscribe((conferences: { [id: string]: ConferenceDto[] }) => {
                this.conferenceList = conferences;
                this.dates = Object.keys(conferences).sort((a: string, b: string) => Date.parse(a) + Date.parse(b));
                this.changeDetectorRef.markForCheck();
            });
    }

}
