import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ConferenceDto } from '../../../../schedule/src/models';

@Component({
    selector: 'app-conference-item',
    templateUrl: './conference-item.component.html',
    styleUrls: ['./conference-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConferenceItemComponent {
    @Input() conference: ConferenceDto;
    @Input() showActionsButton: boolean;
}
