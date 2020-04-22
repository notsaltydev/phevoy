import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-conference-dialog',
    templateUrl: './conference-dialog.component.html',
    styleUrls: ['./conference-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConferenceDialogComponent {
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();
}
