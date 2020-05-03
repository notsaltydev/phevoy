import { TestBed } from '@angular/core/testing';

import { BreakpointMatcherBrowserService } from './breakpoint-matcher.browser.service';

describe('BreakpointMatcherBrowserService', () => {
    let service: BreakpointMatcherBrowserService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BreakpointMatcherBrowserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
