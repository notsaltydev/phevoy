import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ConferenceFormValue } from '../../models';

@Component({
    selector: 'app-conference-dialog',
    templateUrl: './conference-dialog.component.html',
    styleUrls: ['./conference-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConferenceDialogComponent {
    @Input() title: string;
    @Input() conferenceFormValue: ConferenceFormValue;

    private conferenceUpdateFormValue: any;
    private isValidConferenceForm: boolean;

    constructor(
        protected ref: NbDialogRef<ConferenceDialogComponent>,
        private changeDetector: ChangeDetectorRef
    ) {
    }

    conferenceFormChanged(conferenceFormValue: ConferenceFormValue): void {
        this.conferenceUpdateFormValue = conferenceFormValue;
        this.changeDetector.markForCheck();
    }

    validConferenceFormChanged(isValid: boolean): void {
        this.isValidConferenceForm = isValid;
        this.changeDetector.markForCheck();
    }

    save(): void {
        if (this.isValidConferenceForm) {
            this.ref.close({
                ...this.conferenceUpdateFormValue
            });
        }
    }

    dismiss(): void {
        this.ref.close();
    }
}
