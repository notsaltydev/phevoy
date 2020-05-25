import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { AuthResult, AuthService } from '../../services';
import { AUTH_OPTIONS } from '../../auth.options';
import { Router } from '@angular/router';
import { getDeepFromObject } from '../../helpers';

@Component({
    selector: 'app-request-password',
    templateUrl: './request-password.component.html',
    styleUrls: ['./request-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestPasswordComponent {
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

        this.redirectDelay = this.getConfigValue('forms.requestPassword.redirectDelay');
        this.showMessages = this.getConfigValue('forms.requestPassword.showMessages');
        this.strategy = this.getConfigValue('forms.requestPassword.strategy');
    }

    requestPass(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        this.service.requestPassword(this.strategy, this.user).subscribe((result: AuthResult) => {
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
