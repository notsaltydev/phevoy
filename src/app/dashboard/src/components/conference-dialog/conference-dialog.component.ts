import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'app-conference-dialog',
    templateUrl: './conference-dialog.component.html',
    styleUrls: ['./conference-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConferenceDialogComponent {
    @Input() title: string;

    constructor(protected ref: NbDialogRef<ConferenceDialogComponent>) {
    }

    dismiss() {
        this.ref.close();
    }
}
