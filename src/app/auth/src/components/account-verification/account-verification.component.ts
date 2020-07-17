import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthVerificationService } from '../../services/auth-verification';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-account-verification',
    templateUrl: './account-verification.component.html',
    styleUrls: ['./account-verification.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountVerificationComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private authVerificationService: AuthVerificationService,
    ) {
    }

    ngOnInit(): void {
        // TODO: Handle not valid token.
        this.route.params.pipe(
            filter((params: Params) => params && params.token),
            takeUntil(this.destroy$),
            switchMap((params: Params) => this.authVerificationService.verifyAccount(params.token))
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
