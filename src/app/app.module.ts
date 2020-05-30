import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { PageNotFoundComponent } from './page-not-found';
import { ContactComponent } from './contact';
import { FeaturesComponent } from './features';
import { PricingComponent } from './pricing';
import { WindowModule } from './window';
import { ScheduleModule } from './schedule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbDatepickerModule, NbDialogModule, NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FeedbackComponent } from './feedback';
import { CoreModule } from './core';
import { PasswordAuthStrategy } from './auth/src/strategies/password';
import { AuthJWTToken } from './auth/src/services/token';
import { AuthModule } from './auth';

const socialLinks = [
    {
        link: '.',
        icon: 'google-icon',
    },
    {
        link: '.',
        icon: 'facebook-icon',
    },
    {
        link: '.',
        icon: 'apple-icon',
    }
];

@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        WindowModule,
        ScheduleModule,
        BrowserAnimationsModule,
        CoreModule,
        NbThemeModule.forRoot({name: 'corporate'}),
        NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
        NbDialogModule.forRoot(),
        NbDatepickerModule.forRoot(),
        CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
        NbMenuModule.forRoot(),
        AuthModule.forRoot({
            strategies: [
                PasswordAuthStrategy.setup({
                    name: 'email',
                    baseEndpoint: 'http://localhost:3000',
                    token: {
                        class: AuthJWTToken,

                        key: 'accessToken', // this parameter tells where to look for the token
                    },
                    login: {
                        endpoint: '/auth/login',
                        method: 'post',
                        redirect: {

                            success: '/app/dashboard',
                            failure: null, // stay on the same page
                        },
                    },
                    register: {
                        endpoint: '/auth/register',
                        method: 'post'
                    },
                    logout: {
                        endpoint: '/auth/sign-out',
                    },
                    requestPass: {
                        endpoint: '/auth/request-password',
                        method: 'post'
                    },
                    resetPass: {
                        endpoint: '/auth/reset-password',
                        method: 'post'
                    }
                })
            ],
            forms: {
                forms: {
                    login: {
                        redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
                        strategy: 'email',  // strategy id key.
                        rememberMe: true,   // whether to show or not the `rememberMe` checkbox
                        showMessages: {     // show/not show success/error messages
                            success: true,
                            error: true,
                        },
                        socialLinks: socialLinks, // social links at the bottom of a page
                    },
                    register: {
                        redirectDelay: 500,
                        strategy: 'email',
                        showMessages: {
                            success: true,
                            error: true,
                        },
                        terms: true,
                        socialLinks: socialLinks,
                    },
                    requestPassword: {
                        redirectDelay: 500,
                        strategy: 'email',
                        showMessages: {
                            success: true,
                            error: true,
                        },
                        socialLinks: socialLinks,
                    },
                    resetPassword: {
                        redirectDelay: 500,
                        strategy: 'email',
                        showMessages: {
                            success: true,
                            error: true,
                        },
                        socialLinks: socialLinks,
                    },
                    logout: {
                        redirectDelay: 500,
                        strategy: 'email',
                    },
                    validation: {
                        password: {
                            required: true,
                            minLength: 4,
                            maxLength: 50,
                        },
                        email: {
                            required: true,
                        },
                        fullName: {
                            required: false,
                            minLength: 4,
                            maxLength: 50,
                        }
                    }
                }
            }
        })
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        PageNotFoundComponent,
        ContactComponent,
        FeaturesComponent,
        PricingComponent,
        FeedbackComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
