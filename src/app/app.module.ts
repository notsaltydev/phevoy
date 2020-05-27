import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor, JwtInterceptor } from './_helpers/interceptors';
import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { PageNotFoundComponent } from './page-not-found';
import { ContactComponent } from './contact';
import { SignupComponent } from './signup';
import { PasswordRecoveryComponent } from './password-recovery';
import { FeaturesComponent } from './features';
import { PricingComponent } from './pricing';
import { WindowModule } from './window';
import { ScheduleModule } from './schedule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbDatepickerModule, NbDialogModule, NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FooterComponent } from './footer';
import { AUTH_USER_OPTIONS } from './auth/src/auth.options';
import { DummyAuthStrategy } from './auth/src/strategies/dummy';
import { FeedbackComponent } from './feedback';
import { CoreModule } from './core';

const socialLinks = [
    {
        url: 'https://www.phevoy.com/',
        target: '_blank',
        icon: 'Facebook',
    },
    {
        url: 'https://phevoy.com/',
        target: '_blank',
        icon: 'Google',
    },
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
        NbMenuModule.forRoot()
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        PageNotFoundComponent,
        ContactComponent,
        SignupComponent,
        PasswordRecoveryComponent,
        FeaturesComponent,
        PricingComponent,
        FooterComponent,
        FeedbackComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {
            provide: AUTH_USER_OPTIONS,
            useValue: {
                strategies: [
                    DummyAuthStrategy.setup({
                        name: 'email',
                        delay: 1000,
                    }),
                ],
                forms: {
                    login: {
                        socialLinks
                    },
                    register: {
                        socialLinks
                    },
                },
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
