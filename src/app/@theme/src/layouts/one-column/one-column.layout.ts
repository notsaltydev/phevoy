import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PreferencesDialogComponent } from '../../../../dashboard/src/components/preferences-dialog/preferences-dialog.component';
import { FeedbackDialogComponent } from '../../../../dashboard/src/components/feedback-dialog/feedback-dialog.component';
import { HelpDialogComponent } from '../../../../dashboard/src/components/help-dialog/help-dialog.component';
import { NbDialogService, NbMenuService, NbSidebarService } from '@nebular/theme';
import { Router } from '@angular/router';
import { UserService } from '../../../../_services';
import { Layout } from '../../models';

@Component({
    selector: 'app-phev-one-column-layout',
    styleUrls: ['./one-column.layout.scss'],
    templateUrl: './one-column.layout.html',
})
export class OneColumnLayoutComponent implements OnInit {
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
    padding: string = this.getPaddingCssValue(this.defaultLayout.paddings);

    constructor(
        private dialogService: NbDialogService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private userService: UserService,
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService
    ) {
    }

    ngOnInit() {
        this.userService.getUserMe().subscribe(user => {
            this.user = user;
            this.changeDetectorRef.detectChanges();
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

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');

        return false;
    }

    navigateHome(): boolean {
        this.menuService.navigateHome();
        return false;
    }

    private getPaddingCssValue(paddings): string {
        return `${paddings.paddingTop}${paddings.paddingTopUnit} ` +
            `${paddings.paddingRight}${paddings.paddingRightUnit} ` +
            `${paddings.paddingBottom}${paddings.paddingBottomUnit} ` +
            `${paddings.paddingLeft}${paddings.paddingLeftUnit}`;
    }
}
