import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faCheck, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

@Component({
    selector: 'app-plans-and-payment',
    templateUrl: './plans-and-payment.component.html',
    styleUrls: ['./plans-and-payment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlansAndPaymentComponent {
    faCheck: IconDefinition = faCheck;
    faEllipsisV: IconDefinition = faEllipsisV;
}
