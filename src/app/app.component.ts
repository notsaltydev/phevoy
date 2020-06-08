import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from './auth/src/services';
import { takeUntil } from 'rxjs/operators';

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
        this.authService.onAuthenticationChange()
            .pipe(takeUntil(this.destroy$))
            .subscribe((isAuthenticated: boolean) => {
                    if (!isAuthenticated) {
                        this.document.body.classList.remove('nb-theme-corporate');
                    }
                }
            );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
