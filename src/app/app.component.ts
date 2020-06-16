import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { AuthService } from './auth/src/services';
import { filter, takeUntil } from 'rxjs/operators';

const FORBIDDEN_ROUTES: string[] = [
    '/app/dashboard',
    '/app/calendar',
    '/app/recent',
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private router: Router,
        private authService: AuthService,
        @Inject(DOCUMENT) private document: Document
    ) {
    }

    ngOnInit(): void {
        combineLatest([
            this.router.events
                .pipe(filter(event => event instanceof NavigationEnd)),
            this.authService.onAuthenticationChange()
        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe((payload: [NavigationEnd, boolean]) => {
                console.log(payload);
                if (!payload[1] || !FORBIDDEN_ROUTES.includes(payload[0].url)) {
                    this.document.body.classList.remove('nb-theme-corporate');
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
