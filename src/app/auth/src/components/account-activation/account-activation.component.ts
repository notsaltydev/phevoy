import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthVerificationService } from '../../services/auth-verification';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-account-activation',
    templateUrl: './account-activation.component.html',
    styleUrls: ['./account-activation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountActivationComponent implements OnInit, OnDestroy {
    user: { username: string, email: string; };
    submitted: boolean;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(private authVerificationService: AuthVerificationService,
                private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.user = this.authVerificationService.getTemporaryUserVerification();
        this.changeDetector.markForCheck();
    }

    resendEmail(): void {
        this.submitted = true;
        this.authVerificationService.resendEmailVerification(this.user.email).pipe(
            takeUntil(this.destroy$)
        ).subscribe(() => {
            this.submitted = false;
            this.changeDetector.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
