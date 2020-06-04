import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PreferencesDialogComponent } from '../../../../dashboard/src/components/preferences-dialog/preferences-dialog.component';
import { FeedbackDialogComponent } from '../../../../dashboard/src/components/feedback-dialog/feedback-dialog.component';
import { HelpDialogComponent } from '../../../../dashboard/src/components/help-dialog/help-dialog.component';
import { NbDialogService, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../../../_services';
import { Layout } from '../../models';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const defaultLayout: Layout = {
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

@Component({
    selector: 'app-phev-one-column-layout',
    styleUrls: ['./one-column.layout.scss'],
    templateUrl: './one-column.layout.html',
})
export class OneColumnLayoutComponent implements OnInit, OnDestroy {
    user: any;
    padding: string = this.getPaddingCssValue(defaultLayout.paddings);
    showPopover: boolean;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private dialogService: NbDialogService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private userService: UserService,
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private themeService: NbThemeService,
        private breakpointService: NbMediaBreakpointsService
    ) {
    }

    ngOnInit() {
        const {sm, xl} = this.breakpointService.getBreakpointsMap();

        this.userService.getUserMe().subscribe(user => {
            this.user = user;
            this.changeDetectorRef.detectChanges();
        });

        this.router.events
            .pipe(
                takeUntil(this.destroy$),
                filter(event => event instanceof NavigationEnd),
                switchMap(() => this.themeService.onMediaQueryChange()
                    .pipe(
                        take(1),
                        map(([, currentBreakpoint]) => currentBreakpoint.width)
                    ))
            )
            .subscribe((currentBreakpointWidth: number) => {
                if (currentBreakpointWidth < xl) {
                    this.sidebarService.compact('menu-sidebar');
                }

                if (currentBreakpointWidth < sm) {
                    this.sidebarService.collapse('menu-sidebar');
                }
            });
    }

    getAvatarUr(): string {
        return 'url("https://via.placeholder.com/150")';
    }

    logout(): void {
        // this.authenticationService.logout();
        // this.router.navigate(['/']);
    }

    showPreferences(): void {
        this.showPopover = false;
        this.dialogService.open(PreferencesDialogComponent, {
            context: {
                title: 'Preferences'
            }
        });
    }

    showFeedback(): void {
        this.showPopover = false;
        this.dialogService.open(FeedbackDialogComponent, {
            context: {
                title: 'Leave Feedback'
            }
        });
    }

    showHelp(): void {
        this.showPopover = false;
        this.dialogService.open(HelpDialogComponent, {
            context: {
                title: 'Help'
            }
        });
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');

        return false;
    }

    navigateHome(): boolean {
        this.menuService.navigateHome();
        return false;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    togglePopover(): void {
        this.showPopover = !this.showPopover;
    }

    private getPaddingCssValue(paddings): string {
        return `${paddings.paddingTop}${paddings.paddingTopUnit} ` +
            `${paddings.paddingRight}${paddings.paddingRightUnit} ` +
            `${paddings.paddingBottom}${paddings.paddingBottomUnit} ` +
            `${paddings.paddingLeft}${paddings.paddingLeftUnit}`;
    }
}
