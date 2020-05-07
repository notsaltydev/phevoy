import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

export const ACCOUNT_SETTINGS_MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Personal Info',
        icon: 'person-outline',
        link: '/account',
        expanded: true,
        children: [
            {
                title: 'Profile',
                icon: 'smiling-face-outline',
                link: '/account/profile',
                pathMatch: 'prefix'
            },
            {
                title: 'Password & Email',
                icon: 'lock-outline',
                link: '/account/authentication',
                pathMatch: 'prefix'
            },
            {
                title: 'Time & Language',
                icon: 'globe-outline',
                link: '/account/internationalization',
                pathMatch: 'prefix'
            }
        ],
        home: true
    },
    {
        title: 'Notifications',
        icon: 'bell-outline',
        link: '/account/notifications',
    }
];

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
    menu: NbMenuItem[] = ACCOUNT_SETTINGS_MENU_ITEMS;

    constructor() {
    }

    ngOnInit(): void {
    }

}
