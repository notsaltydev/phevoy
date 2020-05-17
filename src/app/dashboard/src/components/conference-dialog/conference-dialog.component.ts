import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Conference } from '../../models';

@Component({
    selector: 'app-conference-dialog',
    templateUrl: './conference-dialog.component.html',
    styleUrls: ['./conference-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConferenceDialogComponent implements OnInit {
    @Input() title: string;
    @Input() name: string;
    @Input() startDate: Date;
    @Input() endDate: Date;
    @Input() description: string;

    private conference: any;
    private isValidConferenceForm: boolean;

    constructor(
        protected ref: NbDialogRef<ConferenceDialogComponent>,
        private changeDetector: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
    }

    conferenceFormChanged(conference: Conference): void {
        this.conference = conference;
        this.changeDetector.markForCheck();
    }

    validConferenceFormChanged(isValid: boolean): void {
        this.isValidConferenceForm = isValid;
        this.changeDetector.markForCheck();
    }

    save(): void {
        if (this.isValidConferenceForm) {
            const {date, description, endTime, name, startTime} = this.conference;
            const startTimeEntries: string[] = startTime.split(':');
            const endTimeEntries: string[] = endTime.split(':');
            const startDate: Date = new Date(date);
            const endDate: Date = new Date(date);

            startDate.setHours(+startTimeEntries[0], +startTimeEntries[1], 0, 0);
            endDate.setHours(+endTimeEntries[0], +endTimeEntries[1], 0, 0);

            this.ref.close({
                name,
                startDate,
                endDate,
                description
            });
        }
    }

    dismiss(): void {
        this.ref.close();
    }
}
