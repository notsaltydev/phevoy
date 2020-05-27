import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { WindowRef } from '../window/src/services';
import { BehaviorSubject, Subject } from 'rxjs';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    host: {
        '[class.fixed]': 'fixed',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Input() fixed: boolean = false;
    expanded$: Subject<boolean> = new BehaviorSubject<boolean>(false);
    navIsFixed: boolean = false;
    isExpanded: boolean = false;
    faBars = faBars;

    constructor(
        private windowRef: WindowRef,
        private changeDetector: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.setNavFixed();
        this.expanded$
            .subscribe((isExpanded: boolean) => {
                this.isExpanded = isExpanded;
                this.changeDetector.markForCheck();
            });
    }

    toggle(): void {
        this.expanded$.next(!this.isExpanded);
    }

    @HostListener('window:scroll', ['$event']) onWindowScroll(): void {
        this.setNavFixed();
    }

    ngOnDestroy(): void {
        this.expanded$.unsubscribe();
    }

    private setNavFixed(): void {
        const height: number = this.windowRef.nativeWindow.pageYOffset;

        this.navIsFixed = height > 65;
    }
}
