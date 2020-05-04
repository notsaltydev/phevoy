import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ConferenceDialogComponent } from '../conference-dialog';
import { CalendarEvent } from 'angular-calendar';
import { CalendarMetaData } from '../scheduler/scheduler.component';
import { ConferenceDto } from '../../../../schedule/src/models';

export enum ScheduleDialogView {
    EDIT = 'edit',
    LIST = 'list',
}

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
        console.log('edit conference: ', conference);
        this.view = ScheduleDialogView.EDIT;
        this.selectedConference = conference;
        this.changeDetector.markForCheck();
    }
}
