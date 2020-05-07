import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-personal-info-settings',
    templateUrl: './personal-info-settings.component.html',
    styleUrls: ['./personal-info-settings.component.scss']
})
export class PersonalInfoSettingsComponent implements OnInit {
    tabs = [
        {
            title: 'Profile',
            route: '/account/profile',
            responsive: true
        },
        {
            title: 'Password & Email',
            route: '/account/authentication',
            responsive: true
        },
        {
            title: 'Time & Language',
            route: '/account/internationalization',
            responsive: true
        }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
