import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsComponent {

    getAvatarUr(): string {
        return 'url("https://via.placeholder.com/150")';
    }

}
