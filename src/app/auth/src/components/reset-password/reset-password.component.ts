import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { getDeepFromObject } from '../../helpers';
import { AuthResult, AuthService } from '../../services';
import { AUTH_OPTIONS } from '../../auth.options';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ResetPasswordDto } from '../../models/reset-password.interface';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {

    redirectDelay: number = 0;
    showMessages: any = {};
    strategy: string = '';

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    private destroy$: Subject<void> = new Subject<void>();
    private resetPasswordToken: string;

    constructor(
        protected service: AuthService,
        @Inject(AUTH_OPTIONS) protected options = {},
        protected cd: ChangeDetectorRef,
        protected router: Router,
        private route: ActivatedRoute
    ) {

        this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
        this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
        this.strategy = this.getConfigValue('forms.resetPassword.strategy');
    }

    ngOnInit(): void {
        // TODO: Handle not valid token.
        this.route.params.pipe(
            filter((params: Params) => params && params.token),
            takeUntil(this.destroy$)
        ).subscribe((params: Params) => {
            this.resetPasswordToken = params.token;
        });
    }

    resetPassword(): void {
        this.errors = this.messages = [];
        this.submitted = true;
        const resetPasswordDto: ResetPasswordDto = {
            newPasswordToken: this.resetPasswordToken,
            newPassword: this.user.password
        };

        this.service.resetPassword(this.strategy, resetPasswordDto).subscribe((result: AuthResult) => {
            this.submitted = false;
            if (result.isSuccess()) {
                this.messages = result.getMessages();
            } else {
                this.errors = result.getErrors();
            }

            const redirect = result.getRedirect();
            if (redirect) {
                setTimeout(() => {
                    return this.router.navigateByUrl(redirect);
                }, this.redirectDelay);
            }
            this.cd.detectChanges();
        });
    }

    getConfigValue(key: string): any {
        return getDeepFromObject(this.options, key, null);
    }
}
