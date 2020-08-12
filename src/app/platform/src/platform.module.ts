import { NgModule } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IS_PLATFORM_BROWSER } from './tokens';

@NgModule({
    providers: [
        {
            provide: IS_PLATFORM_BROWSER,
            useValue: isPlatformBrowser
        },
    ]
})
export class PlatformModule {
}
