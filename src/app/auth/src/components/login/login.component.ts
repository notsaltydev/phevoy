import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject } from '../../helpers';
import { AUTH_OPTIONS, AuthSocialLink } from '../../auth.options';
import { AuthResult, AuthService } from '../../services';
import { AuthVerificationService } from '../../services/auth-verification';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

    redirectDelay: number = 0;
    showMessages: any = {};
    strategy: string = '';

    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    submitted: boolean = false;
    socialLinks: AuthSocialLink[] = [];
    rememberMe = false;

    constructor(
        protected service: AuthService,
        @Inject(AUTH_OPTIONS) protected options = {},
        protected cd: ChangeDetectorRef,
        protected router: Router,
        private authVerificationService: AuthVerificationService
    ) {

        this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
        this.showMessages = this.getConfigValue('forms.login.showMessages');
        this.strategy = this.getConfigValue('forms.login.strategy');
        this.socialLinks = this.getConfigValue('forms.login.socialLinks');
        this.rememberMe = this.getConfigValue('forms.login.rememberMe');
    }

    login(): void {
        this.errors = [];
        this.messages = [];
        this.submitted = true;

        this.service.authenticate(this.strategy, this.user).subscribe((result: AuthResult) => {
            this.submitted = false;

            if (result.isSuccess()) {
                this.messages = result.getMessages();

                if (this.authVerificationService.getTemporaryUserVerification()) {
                    this.authVerificationService.clearTemporaryUserVerification();
                }
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
