import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../services';

@Component({
    selector: 'app-account-activation',
    templateUrl: './account-activation.component.html',
    styleUrls: ['./account-activation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountActivationComponent {
    email = 'example@phevoy.com';
    name = 'John';

    constructor(private authService: AuthService) {
    }

    resendEmail(): void {
        this.authService.resendEmail();
    }
}
