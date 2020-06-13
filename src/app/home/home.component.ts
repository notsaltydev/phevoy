import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaqItem, FAQItems } from './faq-items-data';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
    faqItems: FaqItem[] = FAQItems;
    faBars = faBars;
    isExpanded: boolean;

    toggle(): void {
        this.isExpanded = !this.isExpanded;
    }
}
