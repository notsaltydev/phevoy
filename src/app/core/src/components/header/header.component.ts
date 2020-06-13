import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { WindowRef } from '../../../../window/src/services';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    host: {
        '[class.fixed]': 'fixed',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    @Input() fixed: boolean;
    @Input() isExpanded: boolean;
    @Input() logoRouterLink = '/';
    isFixed: boolean;

    constructor(private windowRef: WindowRef) {
    }

    ngOnInit(): void {
        this.setNavFixed();
    }

    @HostListener('window:scroll', ['$event']) onWindowScroll(): void {
        this.setNavFixed();
    }

    private setNavFixed(): void {
        const height: number = this.windowRef.nativeWindow.pageYOffset;

        this.isFixed = height > 56;
    }
}
