import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject } from '../../helpers';
import { AuthResult, AuthService } from '../../services';
import { AUTH_OPTIONS } from '../../auth.options';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {

    redirectDelay: number = 0;
    showMessages: any = {};
    strategy: string = '';

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};

    constructor(protected service: AuthService,
                @Inject(AUTH_OPTIONS) protected options = {},
                protected cd: ChangeDetectorRef,
                protected router: Router) {

        this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
        this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
        this.strategy = this.getConfigValue('forms.resetPassword.strategy');
    }

    resetPass(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        this.service.resetPassword(this.strategy, this.user).subscribe((result: AuthResult) => {
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
