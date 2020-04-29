import { NgModule } from '@angular/core';
import { WindowModule } from '../../window';
import { BreakpointMatcherBrowserService } from './services/breakpoint-matcher/breakpoint-matcher.browser.service';

@NgModule({
    imports: [
        WindowModule
    ],
    providers: [
        BreakpointMatcherBrowserService
    ]
})
export class ResponsiveModule {
}
