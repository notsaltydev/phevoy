import { Inject, Injectable, InjectionToken } from '@angular/core';

import { authCreateToken, AuthToken, AuthTokenClass } from './token';
import { AUTH_TOKENS } from '../../auth.options';

export interface TokenPack {
    name: string;
    ownerStrategyName: string;
    createdAt: number;
    value: string;
}

export const AUTH_FALLBACK_TOKEN = new InjectionToken<AuthTokenClass>('Phevoy Auth Options');

/**
 * Creates a token parcel which could be stored/restored
 */
@Injectable()
export class AuthTokenParceler {

    constructor(@Inject(AUTH_FALLBACK_TOKEN) private fallbackClass: AuthTokenClass,
                @Inject(AUTH_TOKENS) private tokenClasses: AuthTokenClass[]) {
    }

    wrap(token: AuthToken): string {
        return JSON.stringify({
            name: token.getName(),
            ownerStrategyName: token.getOwnerStrategyName(),
            createdAt: token.getCreatedAt().getTime(),
            value: token.toString(),
        });
    }

    unwrap(value: string): AuthToken {
        let tokenClass: AuthTokenClass = this.fallbackClass;
        let tokenValue = '';
        let tokenOwnerStrategyName = '';
        let tokenCreatedAt: Date = null;

        const tokenPack: TokenPack = this.parseTokenPack(value);
        if (tokenPack) {
            tokenClass = this.getClassByName(tokenPack.name) || this.fallbackClass;
            tokenValue = tokenPack.value;
            tokenOwnerStrategyName = tokenPack.ownerStrategyName;
            tokenCreatedAt = new Date(Number(tokenPack.createdAt));
        }

        return authCreateToken(tokenClass, tokenValue, tokenOwnerStrategyName, tokenCreatedAt);

    }

    // TODO: this could be moved to a separate token registry
    protected getClassByName(name): AuthTokenClass {
        return this.tokenClasses.find((tokenClass: AuthTokenClass) => tokenClass.NAME === name);
    }

    protected parseTokenPack(value): TokenPack {
        try {
            return JSON.parse(value);
        } catch (e) {
        }
        return null;
    }
}
