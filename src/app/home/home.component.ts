import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaqItem, FAQItems } from './faq-items-data';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
    faqItems: FaqItem[] = FAQItems;
}
