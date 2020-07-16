import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthVerificationService } from '../../services/auth-verification';
import { HttpResponseStatus } from '../../models';

@Component({
    selector: 'app-account-activation',
    templateUrl: './account-activation.component.html',
    styleUrls: ['./account-activation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountActivationComponent implements OnInit {
    user: { username: string, email: string; };
    submitted: boolean;

    constructor(private authVerificationService: AuthVerificationService,
                private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.user = this.authVerificationService.getTemporaryUserVerification();
        this.changeDetector.markForCheck();
    }

    resendEmail(): void {
        this.submitted = true;
        this.authVerificationService.resendEmailVerification(this.user.email)
            .subscribe((response: HttpResponseStatus) => {
                this.submitted = false;
                this.changeDetector.markForCheck();
            });
    }
}
