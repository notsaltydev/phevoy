import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ConferenceDialogComponent } from '../conference-dialog';
import { CalendarEvent } from 'angular-calendar';
import { CalendarMetaData } from '../scheduler/scheduler.component';

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

    constructor(
        protected ref: NbDialogRef<ConferenceDialogComponent>,
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
}
