import { AuthOAuth2Token, AuthTokenClass } from '../../services/token/token';
import { AuthStrategyOptions } from '../auth-strategy-options';

export enum OAuth2ResponseType {
    CODE = 'code',
    TOKEN = 'token',
}

// TODO: client_credentials
export enum OAuth2GrantType {
    AUTHORIZATION_CODE = 'authorization_code',
    PASSWORD = 'password',
    REFRESH_TOKEN = 'refresh_token',
}

export enum OAuth2ClientAuthMethod {
    NONE = 'none',
    BASIC = 'basic',
    REQUEST_BODY = 'request-body',
}

export class OAuth2AuthStrategyOptions extends AuthStrategyOptions {
    baseEndpoint?: string = '';
    clientId: string = '';
    clientSecret?: string = '';
    clientAuthMethod?: string = OAuth2ClientAuthMethod.NONE;
    redirect?: { success?: string; failure?: string } = {
        success: '/',
        failure: null,
    };
    defaultErrors?: any[] = ['Something went wrong, please try again.'];
    defaultMessages?: any[] = ['You have been successfully authenticated.'];
    authorize?: {
        endpoint?: string;
        redirectUri?: string;
        responseType?: string;
        requireValidToken?: boolean; // used only with OAuth2ResponseType.TOKEN
        scope?: string;
        state?: string;
        params?: { [key: string]: string };
    } = {
        endpoint: 'authorize',
        responseType: OAuth2ResponseType.CODE,
        requireValidToken: true,
    };
    token?: {
        endpoint?: string;
        grantType?: string;
        redirectUri?: string;
        scope?: string; // Used only with 'password' grantType
        requireValidToken?: boolean;
        class: AuthTokenClass,
    } = {
        endpoint: 'token',
        grantType: OAuth2GrantType.AUTHORIZATION_CODE,
        requireValidToken: true,
        class: AuthOAuth2Token,
    };
    refresh?: {
        endpoint?: string;
        grantType?: string;
        scope?: string;
        requireValidToken?: boolean;
    } = {
        endpoint: 'token',
        grantType: OAuth2GrantType.REFRESH_TOKEN,
        requireValidToken: true,
    };
}

export const auth2StrategyOptions: OAuth2AuthStrategyOptions = new OAuth2AuthStrategyOptions();
