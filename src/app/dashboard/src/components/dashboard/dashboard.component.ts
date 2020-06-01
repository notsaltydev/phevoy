import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Dashboard',
        icon: 'home-outline',
        link: '/app/dashboard',
        home: true
    },
    {
        title: 'Calendar',
        icon: 'calendar-outline',
        link: '/app/calendar',
    },
    {
        title: 'Recent',
        icon: 'clock-outline',
        link: '/app/recent',
    },
];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    menu: NbMenuItem[] = MENU_ITEMS;

    constructor() {
    }

}
