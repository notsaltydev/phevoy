import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
    faBars: IconDefinition = faBars;
    isExpanded: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

    toggle(): void {
        this.isExpanded = !this.isExpanded;
    }

}
