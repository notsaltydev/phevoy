import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'app-preferences-dialog',
    templateUrl: './preferences-dialog.component.html',
    styleUrls: ['./preferences-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreferencesDialogComponent {
    @Input() title: string;

    constructor(protected dialogRef: NbDialogRef<PreferencesDialogComponent>) {
    }

    close(): void {
        this.dialogRef.close();
    }
}
