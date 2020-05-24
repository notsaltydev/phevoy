import { async, inject, TestBed } from '@angular/core/testing';

import { TokenLocalStorage, TokenStorage } from './token-storage';
import { AUTH_TOKENS } from '../../auth.options';
import { authCreateToken, AuthJWTToken, AuthSimpleToken } from './token';
import { AUTH_FALLBACK_TOKEN, AuthTokenParceler } from './token-parceler';

describe('token-storage', () => {

    let tokenStorage: TokenStorage;
    let tokenParceler: AuthTokenParceler;
    const testTokenKey = 'auth_app_token';
    const testTokenValue = 'test-token';
    const ownerStrategyName = 'strategy';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: TokenStorage, useClass: TokenLocalStorage},
                {provide: AUTH_FALLBACK_TOKEN, useValue: AuthSimpleToken},
                {provide: AUTH_TOKENS, useValue: [AuthSimpleToken, AuthJWTToken]},
                AuthTokenParceler,
            ],
        });
    });

    beforeEach(async(inject(
        [TokenStorage, AuthTokenParceler],
        (_tokenStorage, _tokenParceler) => {
            tokenStorage = _tokenStorage;
            tokenParceler = _tokenParceler;
        },
    )));

    afterEach(() => {
        localStorage.removeItem(testTokenKey);
    });


    it('set test token', () => {
        const token = authCreateToken(AuthSimpleToken, testTokenValue, ownerStrategyName);

        tokenStorage.set(token);
        expect(localStorage.getItem(testTokenKey)).toEqual(tokenParceler.wrap(token));
    });

    it('setter set invalid token to localStorage as empty string', () => {
        let token;

        token = authCreateToken(AuthSimpleToken, null, ownerStrategyName);
        tokenStorage.set(token);
        expect(localStorage.getItem(testTokenKey)).toEqual(tokenParceler.wrap(token));

        token = authCreateToken(AuthSimpleToken, undefined, ownerStrategyName);
        tokenStorage.set(token);
        expect(localStorage.getItem(testTokenKey)).toEqual(tokenParceler.wrap(token));
    });

    it('get return null in case token was not set', () => {
        const token = tokenStorage.get();
        expect(token.getValue()).toBe('');
        expect(token.isValid()).toBe(false);
    });

    it('should return correct value', () => {
        const token = authCreateToken(AuthSimpleToken, 'test', ownerStrategyName);
        localStorage.setItem(testTokenKey, tokenParceler.wrap(token));

        expect(tokenStorage.get().getValue()).toEqual(token.getValue());
    });

    it('clear remove token', () => {
        const token = authCreateToken(AuthSimpleToken, 'test', ownerStrategyName);
        localStorage.setItem(testTokenKey, tokenParceler.wrap(token));

        tokenStorage.clear();

        expect(localStorage.getItem(testTokenKey)).toBeNull();
    });

    it('clear remove token only', () => {
        const token = authCreateToken(AuthSimpleToken, 'test', ownerStrategyName);
        localStorage.setItem(testTokenKey, tokenParceler.wrap(token));
        localStorage.setItem(testTokenKey + '2', tokenParceler.wrap(token));

        tokenStorage.clear();

        expect(localStorage.getItem(testTokenKey + '2')).toEqual(tokenParceler.wrap(token));
        expect(localStorage.getItem(testTokenKey)).toBeNull();
    });
});
