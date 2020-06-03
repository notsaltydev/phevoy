import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PreferencesDialogComponent } from '../../../../dashboard/src/components/preferences-dialog/preferences-dialog.component';
import { FeedbackDialogComponent } from '../../../../dashboard/src/components/feedback-dialog/feedback-dialog.component';
import { HelpDialogComponent } from '../../../../dashboard/src/components/help-dialog/help-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../../../_services';
import { Layout } from '../../models';
import { Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-phev-one-column-layout',
    styleUrls: ['./one-column.layout.scss'],
    templateUrl: './one-column.layout.html',
})
export class OneColumnLayoutComponent implements OnInit, OnDestroy {
    user: any;
    defaultLayout: Layout = {
        paddings: {
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingTopUnit: 'px',
            paddingRightUnit: 'px',
            paddingBottomUnit: 'px',
            paddingLeftUnit: 'px'
        },
        header: true,
        sidebar: true
    };
    layout$: Observable<Layout>;
    padding$: Observable<string>;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private dialogService: NbDialogService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private userService: UserService,
    ) {
    }

    ngOnInit() {
        this.userService.getUserMe().subscribe(user => {
            this.user = user;
            this.changeDetectorRef.detectChanges();
        });

        this.layout$ = this.router.events
            .pipe(
                takeUntil(this.destroy$),
                filter(event => event instanceof NavigationEnd),
                map(() => {
                    let route = this.router.routerState.root;
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    console.log(route);
                    return route.snapshot.data['layout'] || this.defaultLayout;
                }),
                shareReplay(),
            );

        this.padding$ = this.layout$
            .pipe(
                map((layout: Layout) => this.getPaddingCssValue(layout.paddings)),
            );
    }

    getAvatarUr(): string {
        return 'url("https://via.placeholder.com/150")';
    }

    logout(): void {
        // this.authenticationService.logout();
        // this.router.navigate(['/']);
    }

    showPreferences(): void {
        this.dialogService.open(PreferencesDialogComponent, {
            context: {
                title: 'Preferences'
            }
        });
    }

    showFeedback(): void {
        this.dialogService.open(FeedbackDialogComponent, {
            context: {
                title: 'Leave Feedback'
            }
        });
    }

    showHelp(): void {
        this.dialogService.open(HelpDialogComponent, {
            context: {
                title: 'Help'
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private getPaddingCssValue(paddings): string {
        return `${paddings.paddingTop}${paddings.paddingTopUnit} ` +
            `${paddings.paddingRight}${paddings.paddingRightUnit} ` +
            `${paddings.paddingBottom}${paddings.paddingBottomUnit} ` +
            `${paddings.paddingLeft}${paddings.paddingLeftUnit}`;
    }
}
