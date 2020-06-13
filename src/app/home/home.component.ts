import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FaqItem, FAQItems } from './faq-items-data';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/src/services';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
    faqItems: FaqItem[] = FAQItems;
    faBars = faBars;
    isExpanded: boolean;
    isAuthenticated: boolean;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private authService: AuthService,
        private changeDetector: ChangeDetectorRef
    ) {
    }

    toggle(): void {
        this.isExpanded = !this.isExpanded;
    }

    ngOnInit(): void {
        this.authService.onAuthenticationChange()
            .pipe(takeUntil(this.destroy$))
            .subscribe((isAuthenticated: boolean) => {
                    this.isAuthenticated = isAuthenticated;
                    this.changeDetector.markForCheck();
                }
            );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
