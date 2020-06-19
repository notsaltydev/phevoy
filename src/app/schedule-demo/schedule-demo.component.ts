import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-schedule-demo',
    templateUrl: './schedule-demo.component.html',
    styleUrls: ['./schedule-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDemoComponent {
}
