import { Component, OnDestroy, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const accountSettingsRouteMap: Map<string, string> = new Map([
    ['profile', 'General'],
    ['authentication', 'Security'],
    ['internationalization', 'Internationalization'],
    ['notifications', 'Notifications'],
    ['plans-and-payment', 'Plans & Payment'],
]);

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
    faBars: IconDefinition = faBars;
    isExpanded: boolean;
    currentRoute = '...';
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.setCurrentRoute();
        this.router.events
            .pipe(
                takeUntil(this.destroy$),
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe((routerEvent: RouterEvent) => {
                this.setCurrentRoute();
            });
    }

    setCurrentRoute(): void {
        this.currentRoute = accountSettingsRouteMap.get(this.route.snapshot.children[0].url.toString());
    }

    toggle(): void {
        this.isExpanded = !this.isExpanded;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
