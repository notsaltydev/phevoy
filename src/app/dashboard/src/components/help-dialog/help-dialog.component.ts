import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'app-help-dialog',
    templateUrl: './help-dialog.component.html',
    styleUrls: ['./help-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpDialogComponent {
    @Input() title: string;

    constructor(protected dialogRef: NbDialogRef<HelpDialogComponent>) {
    }

    close(): void {
        this.dialogRef.close();
    }
}
