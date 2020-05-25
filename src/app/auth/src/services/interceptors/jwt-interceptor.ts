import { Inject, Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthToken } from '../token';
import { AuthService } from '../auth.service';
import { AUTH_TOKEN_INTERCEPTOR_FILTER } from '../../auth.options';

@Injectable()
export class AuthJWTInterceptor implements HttpInterceptor {

    constructor(private injector: Injector,
                @Inject(AUTH_TOKEN_INTERCEPTOR_FILTER) protected filter) {
    }

    protected get authService(): AuthService {
        return this.injector.get(AuthService);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // do not intercept request whose urls are filtered by the injected filter
        if (!this.filter(req)) {
            return this.authService.isAuthenticatedOrRefresh()
                .pipe(
                    switchMap(authenticated => {
                        if (authenticated) {
                            return this.authService.getToken().pipe(
                                switchMap((token: AuthToken) => {
                                    const JWT = `Bearer ${token.getValue()}`;
                                    req = req.clone({
                                        setHeaders: {
                                            Authorization: JWT,
                                        },
                                    });
                                    return next.handle(req);
                                }),
                            );
                        } else {
                            // Request is sent to server without authentication so that the client code
                            // receives the 401/403 error and can act as desired ('session expired', redirect to login, aso)
                            return next.handle(req);
                        }
                    }),
                );
        } else {
            return next.handle(req);
        }
    }

}
