import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConferenceDto } from '../../../../schedule/src/models';
import { formatDistanceStrict } from 'date-fns';

@Component({
    selector: 'app-conference-item',
    templateUrl: './conference-item.component.html',
    styleUrls: ['./conference-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConferenceItemComponent {
    @Input() conference: ConferenceDto;
    @Input() showActionsButton: boolean;

    getFormatDistance(date: Date, baseDate: Date): string {
        return formatDistanceStrict(
            date,
            baseDate
        );
    }
}
