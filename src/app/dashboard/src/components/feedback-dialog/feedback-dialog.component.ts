import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'app-feedback-dialog',
    templateUrl: './feedback-dialog.component.html',
    styleUrls: ['./feedback-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackDialogComponent {
    @Input() title: string;

    constructor(protected dialogRef: NbDialogRef<FeedbackDialogComponent>) {
    }

    close(): void {
        this.dialogRef.close();
    }
}
