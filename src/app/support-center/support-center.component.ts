import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-support-center',
    templateUrl: './support-center.component.html',
    styleUrls: ['./support-center.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupportCenterComponent {
}
