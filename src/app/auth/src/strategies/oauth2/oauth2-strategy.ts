import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthStrategy } from '../auth-strategy';
import { AuthIllegalTokenError, AuthRefreshableToken, AuthToken } from '../../services/token';
import { AuthResult } from '../../services';
import {
    auth2StrategyOptions,
    OAuth2AuthStrategyOptions,
    OAuth2ClientAuthMethod,
    OAuth2GrantType,
    OAuth2ResponseType,
} from './oauth2-strategy.options';
import { AuthStrategyClass } from '../../auth.options';
import { WindowRef } from '../../../../window/src/services';


@Injectable()
export class OAuth2AuthStrategy extends AuthStrategy {

    protected redirectResultHandlers: { [key: string]: Function } = {
        [OAuth2ResponseType.CODE]: () => {
            return observableOf(this.route.snapshot.queryParams).pipe(
                switchMap((params: any) => {
                    if (params.code) {
                        return this.requestToken(params.code);
                    }

                    return observableOf(
                        new AuthResult(
                            false,
                            params,
                            this.getOption('redirect.failure'),
                            this.getOption('defaultErrors'),
                            [],
                        ));
                }),
            );
        },
        [OAuth2ResponseType.TOKEN]: () => {
            const module = 'authorize';
            const requireValidToken = this.getOption(`${module}.requireValidToken`);
            return observableOf(this.route.snapshot.fragment).pipe(
                map(fragment => this.parseHashAsQueryParams(fragment)),
                map((params: any) => {
                    if (!params.error) {
                        return new AuthResult(
                            true,
                            params,
                            this.getOption('redirect.success'),
                            [],
                            this.getOption('defaultMessages'),
                            this.createToken(params, requireValidToken));
                    }
                    return new AuthResult(
                        false,
                        params,
                        this.getOption('redirect.failure'),
                        this.getOption('defaultErrors'),
                        [],
                    );
                }),
                catchError(err => {
                    const errors = [];
                    if (err instanceof AuthIllegalTokenError) {
                        errors.push(err.message);
                    } else {
                        errors.push('Something went wrong.');
                    }
                    return observableOf(
                        new AuthResult(
                            false,
                            err,
                            this.getOption('redirect.failure'),
                            errors,
                        ));
                }),
            );
        },
    };
    protected redirectResults: { [key: string]: Function } = {
        [OAuth2ResponseType.CODE]: () => {
            return observableOf(this.route.snapshot.queryParams).pipe(
                map((params: any) => !!(params && (params.code || params.error))),
            );
        },
        [OAuth2ResponseType.TOKEN]: () => {
            return observableOf(this.route.snapshot.fragment).pipe(
                map(fragment => this.parseHashAsQueryParams(fragment)),
                map((params: any) => !!(params && (params.access_token || params.error))),
            );
        },
    };
    protected defaultOptions: OAuth2AuthStrategyOptions = auth2StrategyOptions;

    constructor(protected http: HttpClient,
                protected route: ActivatedRoute,
                protected window: WindowRef) {
        super();
    }

    get responseType() {
        return this.getOption('authorize.responseType');
    }

    get clientAuthMethod() {
        return this.getOption('clientAuthMethod');
    }

    static setup(options: OAuth2AuthStrategyOptions): [AuthStrategyClass, OAuth2AuthStrategyOptions] {
        return [OAuth2AuthStrategy, options];
    }

    authenticate(data?: any): Observable<AuthResult> {

        if (this.getOption('token.grantType') === OAuth2GrantType.PASSWORD) {
            return this.passwordToken(data.email, data.password);
        } else {
            return this.isRedirectResult()
                .pipe(
                    switchMap((result: boolean) => {
                        if (!result) {
                            this.authorizeRedirect();
                            return observableOf(new AuthResult(true));
                        }
                        return this.getAuthorizationResult();
                    }),
                );
        }
    }

    getAuthorizationResult(): Observable<any> {
        const redirectResultHandler = this.redirectResultHandlers[this.responseType];
        if (redirectResultHandler) {
            return redirectResultHandler.call(this);
        }

        throw new Error(`'${this.responseType}' responseType is not supported,
                      only 'token' and 'code' are supported now`);
    }

    refreshToken(token: AuthRefreshableToken): Observable<AuthResult> {
        const module = 'refresh';
        const url = this.getActionEndpoint(module);
        const requireValidToken = this.getOption(`${module}.requireValidToken`);

        let headers = this.buildAuthHeader() || new HttpHeaders();
        headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(url, this.buildRefreshRequestData(token), {headers: headers})
            .pipe(
                map((res) => {
                    return new AuthResult(
                        true,
                        res,
                        this.getOption('redirect.success'),
                        [],
                        this.getOption('defaultMessages'),
                        this.createRefreshedToken(res, token, requireValidToken));
                }),
                catchError((res) => this.handleResponseError(res)),
            );
    }

    passwordToken(username: string, password: string): Observable<AuthResult> {
        const module = 'token';
        const url = this.getActionEndpoint(module);
        const requireValidToken = this.getOption(`${module}.requireValidToken`);

        let headers = this.buildAuthHeader() || new HttpHeaders();
        headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(url, this.buildPasswordRequestData(username, password), {headers: headers})
            .pipe(
                map((res) => {
                    return new AuthResult(
                        true,
                        res,
                        this.getOption('redirect.success'),
                        [],
                        this.getOption('defaultMessages'),
                        this.createToken(res, requireValidToken));
                }),
                catchError((res) => this.handleResponseError(res)),
            );
    }

    register(data?: any): Observable<AuthResult> {
        throw new Error('`register` is not supported by `OAuth2AuthStrategy`, use `authenticate`.');
    }

    requestPassword(data?: any): Observable<AuthResult> {
        throw new Error('`requestPassword` is not supported by `OAuth2AuthStrategy`, use `authenticate`.');
    }

    resetPassword(data: any = {}): Observable<AuthResult> {
        throw new Error('`resetPassword` is not supported by `OAuth2AuthStrategy`, use `authenticate`.');
    }

    logout(): Observable<AuthResult> {
        return observableOf(new AuthResult(true));
    }

    protected authorizeRedirect() {
        this.window.nativeWindow.location.href = this.buildRedirectUrl();
    }

    protected isRedirectResult(): Observable<boolean> {
        return this.redirectResults[this.responseType].call(this);
    }

    protected requestToken(code: string) {

        const module = 'token';
        const url = this.getActionEndpoint(module);
        const requireValidToken = this.getOption(`${module}.requireValidToken`);

        let headers = this.buildAuthHeader() || new HttpHeaders();
        headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(url, this.buildCodeRequestData(code), {headers: headers})
            .pipe(
                map((res) => {
                    return new AuthResult(
                        true,
                        res,
                        this.getOption('redirect.success'),
                        [],
                        this.getOption('defaultMessages'),
                        this.createToken(res, requireValidToken));
                }),
                catchError((res) => this.handleResponseError(res)),
            );
    }

    protected buildCodeRequestData(code: string): any {
        const params = {
            grant_type: this.getOption('token.grantType'),
            code: code,
            redirect_uri: this.getOption('token.redirectUri'),
            client_id: this.getOption('clientId'),
        };
        return this.urlEncodeParameters(this.cleanParams(this.addCredentialsToParams(params)));
    }

    protected buildRefreshRequestData(token: AuthRefreshableToken): any {
        const params = {
            grant_type: this.getOption('refresh.grantType'),
            refresh_token: token.getRefreshToken(),
            scope: this.getOption('refresh.scope'),
        };
        return this.urlEncodeParameters(this.cleanParams(this.addCredentialsToParams(params)));
    }

    protected buildPasswordRequestData(username: string, password: string): string {
        const params = {
            grant_type: this.getOption('token.grantType'),
            username: username,
            password: password,
            scope: this.getOption('token.scope'),
        };
        return this.urlEncodeParameters(this.cleanParams(this.addCredentialsToParams(params)));
    }

    protected buildAuthHeader(): any {
        if (this.clientAuthMethod === OAuth2ClientAuthMethod.BASIC) {
            if (this.getOption('clientId') && this.getOption('clientSecret')) {
                return new HttpHeaders(
                    {
                        'Authorization': 'Basic ' + btoa(
                            this.getOption('clientId') + ':' + this.getOption('clientSecret')),
                    },
                );
            } else {
                throw Error('For basic client authentication method, please provide both clientId & clientSecret.');
            }
        }
    }

    protected cleanParams(params: any): any {
        Object.entries(params)
            .forEach(([key, val]) => !val && delete params[key]);
        return params;
    }

    protected addCredentialsToParams(params: any): any {
        if (this.clientAuthMethod === OAuth2ClientAuthMethod.REQUEST_BODY) {
            if (this.getOption('clientId') && this.getOption('clientSecret')) {
                return {
                    ...params,
                    client_id: this.getOption('clientId'),
                    client_secret: this.getOption('clientSecret'),
                };
            } else {
                throw Error('For request body client authentication method, please provide both clientId & clientSecret.');
            }
        }
        return params;
    }

    protected handleResponseError(res: any): Observable<AuthResult> {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
            if (res.error.error_description) {
                errors.push(res.error.error_description);
            } else {
                errors = this.getOption('defaultErrors');
            }
        } else if (res instanceof AuthIllegalTokenError) {
            errors.push(res.message);
        } else {
            errors.push('Something went wrong.');
        }

        return observableOf(
            new AuthResult(
                false,
                res,
                this.getOption('redirect.failure'),
                errors,
                [],
            ));
    }

    protected buildRedirectUrl() {
        const params = {
            response_type: this.getOption('authorize.responseType'),
            client_id: this.getOption('clientId'),
            redirect_uri: this.getOption('authorize.redirectUri'),
            scope: this.getOption('authorize.scope'),
            state: this.getOption('authorize.state'),

            ...this.getOption('authorize.params'),
        };

        const endpoint = this.getActionEndpoint('authorize');
        const query = this.urlEncodeParameters(this.cleanParams(params));

        return `${endpoint}?${query}`;
    }

    protected parseHashAsQueryParams(hash: string): { [key: string]: string } {
        return hash ? hash.split('&').reduce((acc: any, part: string) => {
            const item = part.split('=');
            acc[item[0]] = decodeURIComponent(item[1]);
            return acc;
        }, {}) : {};
    }

    protected urlEncodeParameters(params: any): string {
        return Object.keys(params).map((k) => {
            return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
        }).join('&');
    }

    protected createRefreshedToken(res, existingToken: AuthRefreshableToken, requireValidToken: boolean): AuthToken {
        type AuthRefreshToken = AuthRefreshableToken & AuthToken;

        const refreshedToken: AuthRefreshToken = this.createToken<AuthRefreshToken>(res, requireValidToken);
        if (!refreshedToken.getRefreshToken() && existingToken.getRefreshToken()) {
            refreshedToken.setRefreshToken(existingToken.getRefreshToken());
        }
        return refreshedToken;
    }
}
