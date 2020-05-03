import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-empty-state-conference',
    templateUrl: './empty-state-conference.component.html',
    styleUrls: ['./empty-state-conference.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateConferenceComponent {
    @Output() iconClicked: EventEmitter<void> = new EventEmitter<void>();
}
