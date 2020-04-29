import { Observable } from 'rxjs';
import { Breakpoint } from '../../models';

export abstract class BreakpointMatcherService {
    abstract activeBreakpoint$: Observable<Breakpoint>;
    abstract sm$: Observable<boolean>;
    abstract xs$: Observable<boolean>;
    abstract md$: Observable<boolean>;
    abstract lg$: Observable<boolean>;
    abstract xl$: Observable<boolean>;

    abstract isXS(): boolean;

    abstract isSM(): boolean;

    abstract isMD(): boolean;

    abstract isLG(): boolean;

    abstract isXL(): boolean;
}
