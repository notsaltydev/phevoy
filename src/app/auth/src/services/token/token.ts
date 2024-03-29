import { urlBase64Decode } from '../../helpers';

export abstract class AuthToken {

    protected payload: any = null;

    abstract getValue(): string;

    abstract isValid(): boolean;

    // the strategy name used to acquire this token (needed for refreshing token)
    abstract getOwnerStrategyName(): string;

    abstract getCreatedAt(): Date;

    abstract toString(): string;

    getName(): string {
        return (this.constructor as AuthTokenClass).NAME;
    }

    getPayload(): any {
        return this.payload;
    }
}

export class AuthTokenNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class AuthIllegalTokenError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class AuthEmptyTokenError extends AuthIllegalTokenError {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class AuthIllegalJWTTokenError extends AuthIllegalTokenError {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export interface AuthRefreshableToken {
    getRefreshToken(): string;

    setRefreshToken(refreshToken: string);
}

export interface AuthTokenClass<T = AuthToken> {
    NAME: string;

    new(raw: any, strategyName: string, expDate?: Date): T;
}

export function authCreateToken<T extends AuthToken>(tokenClass: AuthTokenClass<T>,
                                                     token: any,
                                                     ownerStrategyName: string,
                                                     createdAt?: Date) {
    return new tokenClass(token, ownerStrategyName, createdAt);
}

export function decodeJwtPayload(payload: string): any {

    if (payload.length === 0) {
        throw new AuthEmptyTokenError('Cannot extract from an empty payload.');
    }

    const parts = payload.split('.');

    if (parts.length !== 3) {
        throw new AuthIllegalJWTTokenError(
            `The payload ${payload} is not valid JWT payload and must consist of three parts.`);
    }

    let decoded;
    try {
        decoded = urlBase64Decode(parts[1]);
    } catch (e) {
        throw new AuthIllegalJWTTokenError(
            `The payload ${payload} is not valid JWT payload and cannot be parsed.`);
    }

    if (!decoded) {
        throw new AuthIllegalJWTTokenError(
            `The payload ${payload} is not valid JWT payload and cannot be decoded.`);
    }
    return JSON.parse(decoded);
}

/**
 * Wrapper for simple (text) token
 */
export class AuthSimpleToken extends AuthToken {

    static NAME = 'phev:auth:simple:token';

    constructor(protected readonly token: any,
                protected readonly ownerStrategyName: string,
                protected createdAt?: Date) {
        super();
        try {
            this.parsePayload();
        } catch (err) {
            if (!(err instanceof AuthTokenNotFoundError)) {
                // token is present but has got a problem, including illegal
                throw err;
            }
        }
        this.createdAt = this.prepareCreatedAt(createdAt);
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getValue(): string {
        return this.token;
    }

    getOwnerStrategyName(): string {
        return this.ownerStrategyName;
    }

    isValid(): boolean {
        return !!this.getValue();
    }

    toString(): string {
        return !!this.token ? this.token : '';
    }

    protected parsePayload(): any {
        this.payload = null;
    }

    protected prepareCreatedAt(date: Date) {
        return date ? date : new Date();
    }
}

/**
 * Wrapper for JWT token with additional methods.
 */
export class AuthJWTToken extends AuthSimpleToken {

    static NAME = 'phev:auth:jwt:token';

    getTokenExpDate(): Date {
        const decoded = this.getPayload();
        if (decoded && !decoded.hasOwnProperty('exp')) {
            return null;
        }
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp); // 'cause jwt token are set in seconds
        return date;
    }

    isValid(): boolean {
        return super.isValid() && (!this.getTokenExpDate() || new Date() < this.getTokenExpDate());
    }

    protected prepareCreatedAt(date: Date) {
        const decoded = this.getPayload();
        return decoded && decoded.iat ? new Date(Number(decoded.iat) * 1000) : super.prepareCreatedAt(date);
    }

    protected parsePayload(): void {
        if (!this.token) {
            throw new AuthTokenNotFoundError('Token not found. ');
        }
        this.payload = decodeJwtPayload(this.token);
    }
}

const prepareOAuth2Token = (data) => {
    if (typeof data === 'string') {
        try {
            return JSON.parse(data);
        } catch (e) {
        }
    }
    return data;
};

/**
 * Wrapper for OAuth2 token whose access_token is a JWT Token
 */
export class AuthOAuth2Token extends AuthSimpleToken {

    static NAME = 'phev:auth:oauth2:token';

    constructor(data: { [key: string]: string | number } | string = {},
                ownerStrategyName: string,
                createdAt?: Date) {

        // we may get it as string when retrieving from a storage
        super(prepareOAuth2Token(data), ownerStrategyName, createdAt);
    }

    getValue(): string {
        return this.token.access_token;
    }

    getRefreshToken(): string {
        return this.token.refresh_token;
    }

    setRefreshToken(refreshToken: string) {
        this.token.refresh_token = refreshToken;
    }

    getType(): string {
        return this.token.token_type;
    }

    isValid(): boolean {
        return super.isValid() && (!this.getTokenExpDate() || new Date() < this.getTokenExpDate());
    }

    getTokenExpDate(): Date {
        if (!this.token.hasOwnProperty('expires_in')) {
            return null;
        }
        return new Date(this.createdAt.getTime() + Number(this.token.expires_in) * 1000);
    }

    toString(): string {
        return JSON.stringify(this.token);
    }

    protected parsePayload(): void {
        if (!this.token) {
            throw new AuthTokenNotFoundError('Token not found.');
        } else {
            if (!Object.keys(this.token).length) {
                throw new AuthEmptyTokenError('Cannot extract payload from an empty token.');
            }
        }
        this.payload = this.token;
    }
}

/**
 * Wrapper for OAuth2 token embedding JWT tokens
 */
export class AuthOAuth2JWTToken extends AuthOAuth2Token {

    static NAME = 'phev:auth:oauth2:jwt:token';

    protected accessTokenPayload: any;

    getAccessTokenPayload(): any {
        return this.accessTokenPayload;
    }

    isValid(): boolean {
        return this.accessTokenPayload && super.isValid();
    }

    getTokenExpDate(): Date {
        if (this.accessTokenPayload && this.accessTokenPayload.hasOwnProperty('exp')) {
            const date = new Date(0);
            date.setUTCSeconds(this.accessTokenPayload.exp);
            return date;
        } else {
            return super.getTokenExpDate();
        }
    }

    protected parsePayload(): void {
        super.parsePayload();
        this.parseAccessTokenPayload();
    }

    protected parseAccessTokenPayload(): any {
        const accessToken = this.getValue();
        if (!accessToken) {
            throw new AuthTokenNotFoundError('access_token key not found.');
        }
        this.accessTokenPayload = decodeJwtPayload(accessToken);
    }

    protected prepareCreatedAt(date: Date) {
        const payload = this.accessTokenPayload;
        return payload && payload.iat ? new Date(Number(payload.iat) * 1000) : super.prepareCreatedAt(date);
    }
}
