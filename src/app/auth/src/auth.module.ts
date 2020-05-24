import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent, LoginComponent, LogoutComponent, RegisterComponent, ResetPasswordComponent } from './components';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
    AUTH_INTERCEPTOR_HEADER,
    AUTH_OPTIONS,
    AUTH_STRATEGIES,
    AUTH_TOKEN_INTERCEPTOR_FILTER,
    AUTH_TOKENS,
    AUTH_USER_OPTIONS,
    AuthOptions,
    AuthStrategyClass,
    defaultAuthOptions
} from './auth.options';
import {
    AUTH_FALLBACK_TOKEN,
    AuthSimpleToken,
    AuthTokenClass,
    AuthTokenParceler,
    TokenLocalStorage,
    TokenService,
    TokenStorage
} from './services/token';
import { AuthService } from './services';
import { DummyAuthStrategy } from './strategies/dummy';

import { deepExtend } from './helpers';
import { HttpRequest } from '@angular/common/http';
import { AuthStrategy, AuthStrategyOptions, OAuth2AuthStrategy, PasswordAuthStrategy } from './strategies';
import { WindowModule } from '../../window';

export function strategiesFactory(options: AuthOptions, injector: Injector): AuthStrategy[] {
    const strategies = [];
    options.strategies
        .forEach(([strategyClass, strategyOptions]: [AuthStrategyClass, AuthStrategyOptions]) => {
            const strategy: AuthStrategy = injector.get(strategyClass);
            strategy.setOptions(strategyOptions);

            strategies.push(strategy);
        });
    return strategies;
}

export function authTokensFactory(strategies: AuthStrategy[]): AuthTokenClass[] {
    const tokens = [];
    strategies
        .forEach((strategy: AuthStrategy) => {
            tokens.push(strategy.getOption('token.class'));
        });
    return tokens;
}

export function authOptionsFactory(options) {
    return deepExtend(defaultAuthOptions, options);
}

export function noOpInterceptorFilter(req: HttpRequest<any>): boolean {
    return true;
}

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        RouterModule,
        FormsModule,
        WindowModule
    ],
    declarations: [
        AuthComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        ResetPasswordComponent
    ],
    providers: [
        {provide: AUTH_OPTIONS, useFactory: authOptionsFactory, deps: [AUTH_USER_OPTIONS]},
        {provide: AUTH_STRATEGIES, useFactory: strategiesFactory, deps: [AUTH_OPTIONS, Injector]},
        {provide: AUTH_TOKENS, useFactory: authTokensFactory, deps: [AUTH_STRATEGIES]},
        {provide: AUTH_FALLBACK_TOKEN, useValue: AuthSimpleToken},
        {provide: AUTH_INTERCEPTOR_HEADER, useValue: 'Authorization'},
        {provide: AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: noOpInterceptorFilter},
        {provide: TokenStorage, useClass: TokenLocalStorage},
        AuthTokenParceler,
        AuthService,
        TokenService,
        DummyAuthStrategy,
        PasswordAuthStrategy,
        OAuth2AuthStrategy,
    ]
})
export class AuthModule {
}
