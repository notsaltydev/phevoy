import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { AUTH_OPTIONS, AuthSocialLink } from '../../auth.options';
import { AuthResult, AuthService } from '../../services';
import { Router } from '@angular/router';
import { getDeepFromObject } from '../../helpers';

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

    constructor(protected service: AuthService,
                @Inject(AUTH_OPTIONS) protected options = {},
                protected cd: ChangeDetectorRef,
                protected router: Router) {

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
            } else {
                this.errors = result.getErrors();
            }

            const redirect = result.getRedirect();
            if (redirect) {
                setTimeout(() => {
                    console.log('redirect', redirect);
                    // return this.router.navigateByUrl(redirect);
                }, this.redirectDelay);
            }
            this.cd.detectChanges();
        });
    }

    getConfigValue(key: string): any {
        return getDeepFromObject(this.options, key, null);
    }
}
