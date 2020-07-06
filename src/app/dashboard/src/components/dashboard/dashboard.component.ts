import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducers';
import { loadConferences } from '../../store/actions/conference.action';

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
export class DashboardComponent implements OnInit {
    menu: NbMenuItem[] = MENU_ITEMS;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.store.dispatch(loadConferences());
    }

}
