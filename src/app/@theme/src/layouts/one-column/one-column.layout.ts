import { Component } from '@angular/core';

@Component({
    selector: 'app-phev-one-column-layout',
    styleUrls: ['./one-column.layout.scss'],
    template: `
        <nb-layout windowMode>
            <nb-layout-header fixed>
                <app-phev-header></app-phev-header>
            </nb-layout-header>

            <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive start>
                <ng-content select="nb-menu"></ng-content>
            </nb-sidebar>

            <nb-layout-column>
                <ng-content select="router-outlet"></ng-content>
            </nb-layout-column>

            <!--      <nb-layout-footer fixed>-->
            <!--        <ngx-footer></ngx-footer>-->
            <!--      </nb-layout-footer>-->
        </nb-layout>
    `,
})
export class OneColumnLayoutComponent {
}
