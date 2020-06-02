import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject } from '../../helpers';
import { AUTH_OPTIONS, AuthSocialLink } from '../../auth.options';
import { AuthResult, AuthService } from '../../services';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

    redirectDelay: number = 0;
    showMessages: any = {};
    strategy: string = '';

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    socialLinks: AuthSocialLink[] = [];

    constructor(protected service: AuthService,
                @Inject(AUTH_OPTIONS) protected options = {},
                protected cd: ChangeDetectorRef,
                protected router: Router) {

        this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
        this.showMessages = this.getConfigValue('forms.register.showMessages');
        this.strategy = this.getConfigValue('forms.register.strategy');
        this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    }

    register(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        this.service.register(this.strategy, this.user).subscribe((result: AuthResult) => {
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
