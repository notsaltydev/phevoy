import { Injectable } from '@angular/core';

import { Observable, of as observableOf } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AuthStrategy } from '../auth-strategy';
import { AuthResult } from '../../services/auth-result';
import { DummyAuthStrategyOptions, dummyStrategyOptions } from './dummy-strategy-options';
import { AuthStrategyClass } from '../../auth.options';


/**
 * Dummy auth strategy. Could be useful for auth setup when backend is not available yet.
 *
 *
 * Strategy settings.
 *
 * ```ts
 * export class DummyAuthStrategyOptions extends AuthStrategyOptions {
 *   name = 'dummy';
 *   token = {
 *     class: AuthSimpleToken,
 *   };
 *   delay? = 1000;
 *   alwaysFail? = false;
 * }
 * ```
 */
@Injectable()
export class DummyAuthStrategy extends AuthStrategy {

    protected defaultOptions: DummyAuthStrategyOptions = dummyStrategyOptions;

    static setup(options: DummyAuthStrategyOptions): [AuthStrategyClass, DummyAuthStrategyOptions] {
        return [DummyAuthStrategy, options];
    }

    authenticate(data?: any): Observable<AuthResult> {
        return observableOf(this.createDummyResult(data))
            .pipe(
                delay(this.getOption('delay')),
            );
    }

    register(data?: any): Observable<AuthResult> {
        return observableOf(this.createDummyResult(data))
            .pipe(
                delay(this.getOption('delay')),
            );
    }

    requestPassword(data?: any): Observable<AuthResult> {
        return observableOf(this.createDummyResult(data))
            .pipe(
                delay(this.getOption('delay')),
            );
    }

    resetPassword(data?: any): Observable<AuthResult> {
        return observableOf(this.createDummyResult(data))
            .pipe(
                delay(this.getOption('delay')),
            );
    }

    logout(data?: any): Observable<AuthResult> {
        return observableOf(this.createDummyResult(data))
            .pipe(
                delay(this.getOption('delay')),
            );
    }

    refreshToken(data?: any): Observable<AuthResult> {
        return observableOf(this.createDummyResult(data))
            .pipe(
                delay(this.getOption('delay')),
            );
    }

    protected createDummyResult(data?: any): AuthResult {

        if (this.getOption('alwaysFail')) {
            return new AuthResult(
                false,
                this.createFailResponse(data),
                null,
                ['Something went wrong.'],
            );
        }

        try {
            const token = this.createToken('test token', true);
            return new AuthResult(
                true,
                this.createSuccessResponse(data),
                '/',
                [],
                ['Successfully logged in.'],
                token,
            );
        } catch (err) {
            return new AuthResult(
                false,
                this.createFailResponse(data),
                null,
                [err.message],
            );
        }


    }
}
