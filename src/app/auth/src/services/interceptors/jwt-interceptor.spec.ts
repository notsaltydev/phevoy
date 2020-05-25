import { Injector } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http';
import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf } from 'rxjs';

import { AUTH_OPTIONS, AUTH_STRATEGIES, AUTH_TOKEN_INTERCEPTOR_FILTER, AUTH_TOKENS, AUTH_USER_OPTIONS, } from '../../auth.options';
import { AuthJWTInterceptor } from './jwt-interceptor';
import { AuthService } from '../auth.service';
import {
    AUTH_FALLBACK_TOKEN,
    AuthJWTToken,
    AuthSimpleToken,
    AuthTokenParceler,
    TokenLocalStorage,
    TokenService,
    TokenStorage
} from '../token';
import { DummyAuthStrategy } from '../../strategies/dummy';
import { authOptionsFactory, strategiesFactory } from '../../auth.module';


describe('jwt-interceptor', () => {

        // tslint:disable
        const validJWTValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzIzNTA4MDAsImV4cCI6MjUzMjM1MDgwMCwic3ViIjoiQWxhaW4gQ0hBUkxFUyIsImFkbWluIjp0cnVlfQ.Rgkgb4KvxY2wp2niXIyLJNJeapFp9z3tCF-zK6Omc8c';
        const validJWTToken = new AuthJWTToken(validJWTValue, 'dummy');
        const expiredJWTToken = new AuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773', 'dummy');
        const authHeader = 'Bearer ' + validJWTValue;

        let authService: AuthService;
        let tokenService: TokenService;
        let dummyAuthStrategy: DummyAuthStrategy;

        let http: HttpClient;
        let httpMock: HttpTestingController;

        function filterInterceptorRequest(req: HttpRequest<any>): boolean {
            return ['/filtered/url']
                .some(url => req.url.includes(url));
        }

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
                providers: [
                    {provide: AUTH_FALLBACK_TOKEN, useValue: AuthSimpleToken},
                    {provide: AUTH_TOKENS, useValue: [AuthJWTToken]},
                    AuthTokenParceler,
                    {
                        provide: AUTH_USER_OPTIONS, useValue: {
                            strategies: [
                                DummyAuthStrategy.setup({
                                    alwaysFail: false,
                                    name: 'dummy',
                                }),
                            ],
                        },
                    },
                    {provide: AUTH_OPTIONS, useFactory: authOptionsFactory, deps: [AUTH_USER_OPTIONS]},
                    {provide: AUTH_STRATEGIES, useFactory: strategiesFactory, deps: [AUTH_OPTIONS, Injector]},
                    {provide: TokenStorage, useClass: TokenLocalStorage},
                    {provide: HTTP_INTERCEPTORS, useClass: AuthJWTInterceptor, multi: true},
                    {provide: AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest},
                    TokenService,
                    AuthService,
                    DummyAuthStrategy,
                ],
            });
            authService = TestBed.inject(AuthService);
            tokenService = TestBed.inject(TokenService);
            dummyAuthStrategy = TestBed.inject(DummyAuthStrategy);
        });

        beforeEach(async(
            inject([HttpClient, HttpTestingController], (_httpClient, _httpMock) => {
                http = _httpClient;
                httpMock = _httpMock;
            }),
        ));

        it('Url filtered, isAuthenticatedOrRefresh not called, token not added', () => {
            const spy = spyOn(authService, 'isAuthenticatedOrRefresh');
            http.get('/filtered/url/').subscribe(res => {
                expect(spy).not.toHaveBeenCalled();
            });
            httpMock.expectOne(
                req => req.url === '/filtered/url/'
                    && !req.headers.get('Authorization'),
            ).flush({});
        });

        it('Url not filtered, isAuthenticatedOrRefresh called, authenticated, token added', () => {
            const spy = spyOn(authService, 'isAuthenticatedOrRefresh')
                .and.returnValue(observableOf(true));
            spyOn(authService, 'getToken')
                .and
                .returnValue(observableOf(validJWTToken));
            http.get('/notfiltered/url/').subscribe(res => {
                expect(spy).toHaveBeenCalled();
            });
            httpMock.expectOne(
                req => req.url === '/notfiltered/url/'
                    && req.headers.get('Authorization') === authHeader,
            ).flush({});
        });

        it('Url not filtered, isAuthenticatedOrRefresh called, not authenticated, token not added', () => {
            const spy = spyOn(authService, 'isAuthenticatedOrRefresh')
                .and.returnValue(observableOf(false));
            spyOn(authService, 'getToken')
                .and
                .returnValue(observableOf(expiredJWTToken));
            http.get('/notfiltered/url/').subscribe(res => {
                expect(spy).toHaveBeenCalled();
            });
            httpMock.expectOne(
                req => req.url === '/notfiltered/url/'
                    && !req.headers.get('Authorization'),
            ).flush({});
        });

    },
);
