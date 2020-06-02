import { async, inject, TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { TokenLocalStorage, TokenStorage } from './token-storage';
import { authCreateToken, AuthJWTToken, AuthSimpleToken, AuthToken } from './token';
import { TokenService } from './token.service';
import { AUTH_FALLBACK_TOKEN, AuthTokenParceler } from './token-parceler';
import { AUTH_TOKENS } from '../../auth.options';

const noop = () => {
};
const ownerStrategyName = 'strategy';

describe('token-service', () => {

    let tokenService: TokenService;
    let tokenStorage: TokenLocalStorage;
    const simpleToken = authCreateToken(AuthSimpleToken, 'test value', ownerStrategyName);
    const emptyToken = authCreateToken(AuthSimpleToken, '', ownerStrategyName);
    const testTokenKey = 'auth_app_token';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: TokenStorage, useClass: TokenLocalStorage},
                {provide: AUTH_FALLBACK_TOKEN, useValue: AuthSimpleToken},
                {provide: AUTH_TOKENS, useValue: [AuthSimpleToken, AuthJWTToken]},
                AuthTokenParceler,
                TokenService,
            ],
        });
    });

    beforeEach(async(inject(
        [TokenService, TokenStorage],
        (_tokenService, _tokenStorage) => {
            tokenService = _tokenService;
            tokenStorage = _tokenStorage;
        },
    )));

    afterEach(() => {
        localStorage.removeItem(testTokenKey);
    });

    it('set calls storage set', () => {

        const spy = spyOn(tokenStorage, 'set')
            .and
            .returnValue(null);

        tokenService.set(simpleToken).subscribe(() => {
            expect(spy).toHaveBeenCalled();
        });
    });

    it('get return null in case token was not set', () => {

        const spy = spyOn(tokenStorage, 'get')
            .and
            .returnValue(emptyToken);

        tokenService.get()
            .subscribe((token: AuthToken) => {
                expect(spy).toHaveBeenCalled();
                expect(token.getValue()).toEqual('');
                expect(token.isValid()).toBe(false);
            });
    });

    it('should return correct value', () => {
        tokenService.set(simpleToken).subscribe(noop);

        tokenService.get()
            .subscribe((token: AuthToken) => {
                expect(token.getValue()).toEqual(simpleToken.getValue());
            });
    });

    it('clear remove token', () => {

        const spy = spyOn(tokenStorage, 'clear')
            .and
            .returnValue(null);

        tokenService.set(simpleToken).subscribe(noop);

        tokenService.clear().subscribe(() => {
            expect(spy).toHaveBeenCalled();
        });
    });

    it('token should be published', (done) => {
        tokenService.tokenChange()
            .pipe(take(1))
            .subscribe((token: AuthToken) => {
                expect(token.getValue()).toEqual('');
            });
        tokenService.set(simpleToken).subscribe(noop);
        tokenService.tokenChange()
            .subscribe((token: AuthToken) => {
                expect(token.getValue()).toEqual(simpleToken.getValue());
                done();
            });
    });

    it('clear should be published', (done) => {
        tokenService.tokenChange()
            .pipe(take(1))
            .subscribe((token: AuthToken) => {
                expect(token.getValue()).toEqual('');
            });
        tokenService.set(simpleToken).subscribe(noop);
        tokenService.tokenChange()
            .pipe(take(1))
            .subscribe((token: AuthToken) => {
                expect(token.getValue()).toEqual(simpleToken.getValue());
            });
        tokenService.clear().subscribe(noop);
        tokenService.tokenChange()
            .subscribe((token: AuthToken) => {
                expect(token.getValue()).toEqual('');
                done();
            });
    });
});
