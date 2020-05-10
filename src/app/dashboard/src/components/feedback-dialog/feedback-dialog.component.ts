import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-feedback-dialog',
    templateUrl: './feedback-dialog.component.html',
    styleUrls: ['./feedback-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackDialogComponent {
    @Input() title: string;

    constructor() {
    }

    close(): void {

    }
}
