import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpRequest } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthSimpleToken, AuthTokenClass } from './services/token/token';
import { TokenLocalStorage, TokenStorage } from './services/token/token-storage';
import { TokenService } from './services/token/token.service';
import { AUTH_FALLBACK_TOKEN, AuthTokenParceler } from './services/token/token-parceler';
import { AuthStrategy } from './strategies/auth-strategy';
import { AuthStrategyOptions } from './strategies/auth-strategy-options';
import { DummyAuthStrategy } from './strategies/dummy/dummy-strategy';
import { OAuth2AuthStrategy } from './strategies/oauth2/oauth2-strategy';
import { PasswordAuthStrategy } from './strategies/password/password-strategy';

import {
    AUTH_INTERCEPTOR_HEADER,
    AUTH_OPTIONS,
    AUTH_STRATEGIES,
    AUTH_TOKEN_INTERCEPTOR_FILTER,
    AUTH_TOKENS,
    AUTH_USER_OPTIONS,
    AuthOptions,
    AuthStrategyClass,
    defaultAuthOptions,
} from './auth.options';


import { deepExtend } from './helpers';
import { AuthComponent } from './components/auth';
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';
import { RequestPasswordComponent } from './components/request-password';
import { ResetPasswordComponent } from './components/reset-password';
import { LogoutComponent } from './components/logout';
import { AccountActivationComponent } from './components/account-activation';
import { AccountVerificationComponent } from './components/account-verification';
import { CoreModule } from '../../core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './guards';
import { WindowModule } from '../../window';
import { AuthVerificationService } from './services/auth-verification';

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
    return req.url.includes('auth');
}

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        RouterModule,
        FormsModule,
        WindowModule,
        CoreModule
    ],
    declarations: [
        AuthComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        RequestPasswordComponent,
        ResetPasswordComponent,
        AccountActivationComponent,
        AccountVerificationComponent
    ]
})
export class AuthModule {
    static forRoot(authOptions?: AuthOptions): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                {provide: AUTH_USER_OPTIONS, useValue: authOptions},
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
                AuthVerificationService,
                DummyAuthStrategy,
                PasswordAuthStrategy,
                OAuth2AuthStrategy,
                AuthGuard
            ],
        };
    }
}
