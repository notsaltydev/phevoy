import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../../../../_services';
import { ScheduleService } from '../../../../schedule/src/services/schedule';
import { NbSidebarService } from '@nebular/theme';


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
        private router: Router,
        private sidebarService: NbSidebarService
    ) {
    }

    toggle(): void {
        this.sidebarService.toggle(false, 'left');
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
