import { Inject, Injectable } from '@angular/core';

import { Observable, of as observableOf } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthStrategy } from '../strategies/auth-strategy';
import { AUTH_STRATEGIES } from '../auth.options';
import { AuthResult } from './auth-result';
import { TokenService } from './token/token.service';
import { AuthToken } from './token/token';

/**
 * Common authentication service.
 * Should be used to as an interlayer between UI Components and Auth Strategy.
 */
@Injectable()
export class AuthService {

    constructor(protected tokenService: TokenService,
                @Inject(AUTH_STRATEGIES) protected strategies) {
    }

    getToken(): Observable<AuthToken> {
        return this.tokenService.get();
    }

    isAuthenticated(): Observable<boolean> {
        return this.getToken()
            .pipe(map((token: AuthToken) => token.isValid()));
    }

    isAuthenticatedOrRefresh(): Observable<boolean> {
        return this.getToken()
            .pipe(
                switchMap(token => {
                    if (token.getValue() && !token.isValid()) {
                        return this.refreshToken(token.getOwnerStrategyName(), token)
                            .pipe(
                                switchMap(res => {
                                    if (res.isSuccess()) {
                                        return this.isAuthenticated();
                                    } else {
                                        return observableOf(false);
                                    }
                                }),
                            );
                    } else {
                        return observableOf(token.isValid());
                    }
                }));
    }

    onTokenChange(): Observable<AuthToken> {
        return this.tokenService.tokenChange();
    }

    onAuthenticationChange(): Observable<boolean> {
        return this.onTokenChange()
            .pipe(map((token: AuthToken) => token.isValid()));
    }

    /**
     * Authenticates with the selected strategy
     * Stores received token in the token storage
     *
     * Example:
     * authenticate('email', {email: 'email@example.com', password: 'test'})
     *
     * @param strategyName
     * @param data
     * @returns {Observable<AuthResult>}
     */
    authenticate(strategyName: string, data?: any): Observable<AuthResult> {
        return this.getStrategy(strategyName).authenticate(data)
            .pipe(
                switchMap((result: AuthResult) => {
                    return this.processResultToken(result);
                }),
            );
    }

    /**
     * Registers with the selected strategy
     * Stores received token in the token storage
     *
     * Example:
     * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
     *
     * @param strategyName
     * @param data
     * @returns {Observable<AuthResult>}
     */
    register(strategyName: string, data?: any): Observable<AuthResult> {
        return this.getStrategy(strategyName).register(data)
            .pipe(
                switchMap((result: AuthResult) => {
                    return this.processResultToken(result);
                }),
            );
    }

    /**
     * Sign outs with the selected strategy
     * Removes token from the token storage
     *
     * Example:
     * logout('email')
     *
     * @param strategyName
     * @returns {Observable<AuthResult>}
     */
    logout(strategyName: string): Observable<AuthResult> {
        return this.getStrategy(strategyName).logout()
            .pipe(
                switchMap((result: AuthResult) => {
                    if (result.isSuccess()) {
                        this.tokenService.clear()
                            .pipe(map(() => result));
                    }
                    return observableOf(result);
                }),
            );
    }

    /**
     * Sends forgot password request to the selected strategy
     *
     * Example:
     * requestPassword('email', {email: 'email@example.com'})
     *
     * @param strategyName
     * @param data
     * @returns {Observable<AuthResult>}
     */
    requestPassword(strategyName: string, data?: any): Observable<AuthResult> {
        return this.getStrategy(strategyName).requestPassword(data);
    }

    /**
     * Tries to reset password with the selected strategy
     *
     * Example:
     * resetPassword('email', {newPassword: 'test'})
     *
     * @param strategyName
     * @param data
     * @returns {Observable<AuthResult>}
     */
    resetPassword(strategyName: string, data?: any): Observable<AuthResult> {
        return this.getStrategy(strategyName).resetPassword(data);
    }

    /**
     * Sends a refresh token request
     * Stores received token in the token storage
     *
     * Example:
     * refreshToken('email', {token: token})
     *
     * @param {string} strategyName
     * @param data
     * @returns {Observable<AuthResult>}
     */
    refreshToken(strategyName: string, data?: any): Observable<AuthResult> {
        return this.getStrategy(strategyName).refreshToken(data)
            .pipe(
                switchMap((result: AuthResult) => {
                    return this.processResultToken(result);
                }),
            );
    }

    /**
     * Get registered strategy by name
     *
     * Example:
     * getStrategy('email')
     *
     * @param {string} provider
     * @returns {AbstractAuthProvider}
     */
    protected getStrategy(strategyName: string): AuthStrategy {
        const found = this.strategies.find((strategy: AuthStrategy) => strategy.getName() === strategyName);

        if (!found) {
            throw new TypeError(`There is no Auth Strategy registered under '${strategyName}' name`);
        }

        return found;
    }

    private processResultToken(result: AuthResult) {
        if (result.isSuccess() && result.getToken()) {
            return this.tokenService.set(result.getToken())
                .pipe(
                    map((token: AuthToken) => {
                        return result;
                    }),
                );
        }

        return observableOf(result);
    }
}
