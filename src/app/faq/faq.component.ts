import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent {
}
