import { InjectionToken } from '@angular/core';

export const IS_PLATFORM_BROWSER: InjectionToken<(id: string) => boolean>
    = new InjectionToken<(id: string) => boolean>('isPlatformBrowser');
