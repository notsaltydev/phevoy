import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, throttleTime } from 'rxjs/operators';
import { WindowRef } from '../../../../window/src/services';
import { BreakpointMatcherService } from './breakpoint-matcher.service';
import { Breakpoint } from '../../models';

@Injectable()
export class BreakpointMatcherBrowserService extends BreakpointMatcherService {

    readonly activeBreakpoint$: Observable<Breakpoint>;
    readonly xs$: Observable<boolean>;
    readonly sm$: Observable<boolean>;
    readonly md$: Observable<boolean>;
    readonly lg$: Observable<boolean>;
    readonly xl$: Observable<boolean>;
    /*  xs = Extra small <576px
      Max container width None (auto)

      sm = Small ≥576px
      Max container width 540px

      md = Medium ≥768px
      Max container width 720px

      lg = Large ≥992px
      Max container width 960px

      xl = Extra large ≥1200px
      Max container width 1140px*/

    private readonly BREAKPOINT_XS: string = '576px';
    private readonly BREAKPOINT_SM: string = '576px';
    private readonly BREAKPOINT_MD: string = '768px';
    private readonly BREAKPOINT_LG: string = '992px';
    private readonly BREAKPOINT_XL: string = '1200px';

    constructor(
        private windowRef: WindowRef
    ) {
        super();
        this.activeBreakpoint$ = this.createResizeObservable();

        this.xs$ = this.isActiveBreakpoint(Breakpoint.XS);
        this.sm$ = this.isActiveBreakpoint(Breakpoint.SM);
        this.md$ = this.isActiveBreakpoint(Breakpoint.MD);
        this.lg$ = this.isActiveBreakpoint(Breakpoint.LG);
        this.xl$ = this.isActiveBreakpoint(Breakpoint.XL);
    }

    isXS(): boolean {
        return this.matchesBreakpoint('max-width', this.BREAKPOINT_XL);
    }

    isSM(): boolean {
        return this.matchesBreakpoint('min-width', this.BREAKPOINT_SM);
    }

    isMD(): boolean {
        return this.matchesBreakpoint('min-width', this.BREAKPOINT_MD);
    }

    isLG(): boolean {
        return this.matchesBreakpoint('min-width', this.BREAKPOINT_LG);
    }

    isXL(): boolean {
        return this.matchesBreakpoint('min-width', this.BREAKPOINT_XL);
    }

    private createResizeObservable(): Observable<Breakpoint> {
        const resize$: Observable<Event> = fromEvent<Event>(this.windowRef.nativeWindow, 'resize');
        const throttledResize$: Observable<Event> = resize$.pipe(
            throttleTime(100)
        );
        const debouncedResize$: Observable<Event> = resize$.pipe(
            debounceTime(100)
        );

        return merge(throttledResize$, debouncedResize$)
            .pipe(
                startWith({}),
                map(() => this.getCurrentBreakpoint()),
                distinctUntilChanged()
            );
    }

    private isActiveBreakpoint(selectedBreakpoint: Breakpoint): Observable<boolean> {
        return this.activeBreakpoint$.pipe(
            map((breakpoint: Breakpoint) => breakpoint === selectedBreakpoint),
            distinctUntilChanged()
        );
    }

    private matchesBreakpoint(condition: string, breakpoint: string): boolean {
        const query: string = `only screen and (${condition}: ${breakpoint})`;

        return this.windowRef.nativeWindow.matchMedia(query).matches;
    }

    private getCurrentBreakpoint(): Breakpoint {
        if (this.isSM()) {
            return Breakpoint.XS;
        }

        if (this.isMD()) {
            return Breakpoint.MD;
        }

        if (this.isLG()) {
            return Breakpoint.LG;
        }

        if (this.isXL()) {
            return Breakpoint.XL;
        }

        return Breakpoint.SM;
    }
}
