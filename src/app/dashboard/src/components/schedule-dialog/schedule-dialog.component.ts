import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ConferenceDialogComponent } from '../conference-dialog';
import { CalendarEvent } from 'angular-calendar';
import { CalendarMetaData } from '../scheduler/scheduler.component';
import { ConferenceDto } from '../../../../schedule/src/models';
import { Conference, ScheduleDialogView } from '../../models';

@Component({
    selector: 'app-schedule-dialog',
    templateUrl: './schedule-dialog.component.html',
    styleUrls: ['./schedule-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDialogComponent implements OnInit {
    @Input() title: string;
    @Input() date: Date;
    @Input() events: CalendarEvent<CalendarMetaData>[];
    view: ScheduleDialogView = ScheduleDialogView.LIST;
    ScheduleDialogView = ScheduleDialogView;
    selectedConference: ConferenceDto;

    constructor(
        protected ref: NbDialogRef<ConferenceDialogComponent>,
        private changeDetector: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
    }

    dismiss(): void {
        this.ref.close();
    }

    save(): void {
        console.log('save');
    }

    edit(conference: ConferenceDto): void {
        this.view = ScheduleDialogView.FORM;
        this.selectedConference = conference;
        this.changeDetector.markForCheck();
    }

    back(): void {
        this.view = ScheduleDialogView.LIST;
        this.selectedConference = null;
        this.changeDetector.markForCheck();
    }

    conferenceFormChanged(conference: Conference): void {
        this.selectedConference = {
            ...this.selectedConference,
            ...conference
        };

        console.log('conferenceFormChanged', this.selectedConference);
    }

    createConference(): void {
        console.log('createConference: ');
    }

    delete(id: string): void {
        console.log('Delete: ', id);
    }
}
