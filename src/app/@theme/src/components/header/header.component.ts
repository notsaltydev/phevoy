import { Component } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

@Component({
    selector: 'app-phev-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent {

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
    ) {
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');

        return false;
    }

    navigateHome(): boolean {
        this.menuService.navigateHome();
        return false;
    }
}
