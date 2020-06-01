import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PreferencesDialogComponent } from '../../../../dashboard/src/components/preferences-dialog/preferences-dialog.component';
import { FeedbackDialogComponent } from '../../../../dashboard/src/components/feedback-dialog/feedback-dialog.component';
import { HelpDialogComponent } from '../../../../dashboard/src/components/help-dialog/help-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { UserService } from '../../../../_services';

@Component({
    selector: 'app-phev-one-column-layout',
    styleUrls: ['./one-column.layout.scss'],
    templateUrl: './one-column.layout.html',
})
export class OneColumnLayoutComponent implements OnInit {
    user: any;

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
}
