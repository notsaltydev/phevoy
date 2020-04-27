import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../../../../_services';
import { ScheduleService } from '../../../../schedule/src/services/schedule';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
    loading = false;
    user: any;

    constructor(
        private userService: UserService,
        private scheduleService: ScheduleService,
        private changeDetectorRef: ChangeDetectorRef,
        // FIXME remove Auth Service.
        private authenticationService: AuthenticationService,
        // FIXME remove Router.
        private router: Router
    ) {
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getUserMe().subscribe(user => {
            this.loading = false;
            this.user = user;
            this.changeDetectorRef.markForCheck();
        });
    }

    getAvatarUr(): string {
        return 'url("https://via.placeholder.com/150")';
    }

    logout(): void {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }
}
