import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { HeaderComponent } from './header';
import { WindowModule } from './window';
import { ScheduleModule } from "./schedule";
import { DialogModule } from "./dialog";

@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        WindowModule,
        ScheduleModule,
        DialogModule
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
        HeaderComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
