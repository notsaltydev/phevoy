import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
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
    @Output() editConference: EventEmitter<ConferenceDto> = new EventEmitter<ConferenceDto>();
    @Output() deleteConference: EventEmitter<string> = new EventEmitter<string>();
    faEdit: IconDefinition = faEdit;
    faTrashAlt: IconDefinition = faTrashAlt;

    delete(id: string): void {
        this.deleteConference.emit(id);
    }

    edit(conference: ConferenceDto): void {
        this.editConference.emit(conference);
    }
}
