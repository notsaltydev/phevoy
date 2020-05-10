import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-preferences-dialog',
    templateUrl: './preferences-dialog.component.html',
    styleUrls: ['./preferences-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreferencesDialogComponent {
    @Input() title: string;

    constructor() {
    }

    close(): void {

    }
}
