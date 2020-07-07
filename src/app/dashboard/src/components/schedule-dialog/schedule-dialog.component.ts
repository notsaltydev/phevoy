import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ConferenceDialogComponent } from '../conference-dialog';
import { CalendarEvent } from 'angular-calendar';
import { ConferenceFormValue, ScheduleDialogMode, ScheduleDialogView } from '../../models';
import { ConferenceDto } from '../../models/conference.dto';
import { v4 } from 'uuid';

@Component({
    selector: 'app-schedule-dialog',
    templateUrl: './schedule-dialog.component.html',
    styleUrls: ['./schedule-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDialogComponent implements OnInit {
    @Input() date: Date;
    @Input() events: CalendarEvent<ConferenceDto>[];
    @Input() view: ScheduleDialogView = ScheduleDialogView.LIST;
    @Input() mode: ScheduleDialogMode = ScheduleDialogMode.CREATE;
    ScheduleDialogView = ScheduleDialogView;
    ScheduleDialogMode = ScheduleDialogMode;
    selectedConference: ConferenceDto;

    private isValidConferenceForm: boolean;

    constructor(
        protected ref: NbDialogRef<ConferenceDialogComponent>,
        private changeDetector: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        if (
            this.view === ScheduleDialogView.FORM &&
            this.mode === ScheduleDialogMode.CREATE
        ) {
            this.selectedConference = {
                id: v4(),
                name: '',
                startDate: this.date,
                endDate: null,
                description: ''
            };
        } else if (
            this.view === ScheduleDialogView.FORM &&
            this.mode === ScheduleDialogMode.UPDATE
        ) {
            this.selectedConference = this.events[0].meta;
        }

        this.changeDetector.markForCheck();
    }

    dismiss(): void {
        this.ref.close();
    }

    save(): void {
        if (this.isValidConferenceForm && this.mode === ScheduleDialogMode.CREATE) {
            this.closeWithPayload('Create', this.selectedConference);
        }

        if (this.isValidConferenceForm && this.mode === ScheduleDialogMode.UPDATE) {
            this.closeWithPayload('Update', this.selectedConference);
        }
    }

    create(): void {
        this.view = ScheduleDialogView.FORM;
        this.mode = ScheduleDialogMode.CREATE;
        this.selectedConference = {
            id: v4(),
            name: '',
            startDate: this.date,
            endDate: this.date,
            description: ''
        };
        this.changeDetector.markForCheck();
    }

    edit(conference: ConferenceDto): void {
        this.view = ScheduleDialogView.FORM;
        this.mode = ScheduleDialogMode.UPDATE;
        this.selectedConference = conference;
        this.changeDetector.markForCheck();
    }

    back(): void {
        this.view = ScheduleDialogView.LIST;
        this.selectedConference = null;
        this.changeDetector.markForCheck();
    }

    conferenceFormValueChanged(conferenceFormValue: ConferenceFormValue): void {
        this.selectedConference = {
            ...this.selectedConference,
            ...conferenceFormValue
        };
    }

    delete(conference: ConferenceDto): void {
        this.closeWithPayload('Delete', conference);
    }

    join(event: MouseEvent, conference: ConferenceDto): void {
        event.stopPropagation();

        this.closeWithPayload('Join', conference);
    }

    validConferenceFormChanged(isValid: boolean): void {
        this.isValidConferenceForm = isValid;
        this.changeDetector.markForCheck();
    }

    private closeWithPayload(action: string, payload: ConferenceDto): void {
        this.ref.close({action, payload});
    }
}
