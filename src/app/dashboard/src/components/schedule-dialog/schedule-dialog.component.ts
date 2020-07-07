import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ConferenceDialogComponent } from '../conference-dialog';
import { CalendarEvent } from 'angular-calendar';
import { CalendarMetaData } from '../scheduler/scheduler.component';
import { ConferenceFormValue, ScheduleDialogMode, ScheduleDialogView } from '../../models';

@Component({
    selector: 'app-schedule-dialog',
    templateUrl: './schedule-dialog.component.html',
    styleUrls: ['./schedule-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDialogComponent implements OnInit {
    @Input() date: Date;
    @Input() events: CalendarEvent<CalendarMetaData>[];
    @Input() view: ScheduleDialogView = ScheduleDialogView.LIST;
    @Input() mode: ScheduleDialogMode = ScheduleDialogMode.CREATE;
    ScheduleDialogView = ScheduleDialogView;
    ScheduleDialogMode = ScheduleDialogMode;
    selectedConference: ConferenceFormValue;

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
            this.ref.close({
                action: 'Create',
                payload: {
                    conference: this.selectedConference
                }
            });
        }

        if (this.isValidConferenceForm && this.mode === ScheduleDialogMode.UPDATE) {
            this.ref.close({
                action: 'Update',
                payload: {
                    conference: this.selectedConference
                }
            });
        }
    }

    create(): void {
        this.view = ScheduleDialogView.FORM;
        this.mode = ScheduleDialogMode.CREATE;
        this.selectedConference = {
            name: '',
            startDate: this.date,
            endDate: this.date,
            description: ''
        };
        this.changeDetector.markForCheck();
    }

    edit(conference: ConferenceFormValue): void {
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

    conferenceFormChanged(conference: ConferenceFormValue): void {
        this.selectedConference = {
            ...this.selectedConference,
            ...conference
        };
    }

    delete(conference: ConferenceFormValue): void {
        this.ref.close({
            action: 'Delete',
            payload: {
                id: conference.id
            }
        });
    }

    join(event: MouseEvent, id: string) {
        event.stopPropagation();

        this.ref.close({
            action: 'Join',
            payload: {
                id
            }
        });
    }

    validConferenceFormChanged(isValid: boolean): void {
        this.isValidConferenceForm = isValid;
        this.changeDetector.markForCheck();
    }
}
