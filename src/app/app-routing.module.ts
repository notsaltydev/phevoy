import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/guards';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { PageNotFoundComponent } from './page-not-found';
import { ContactComponent } from './contact';
import { SignupComponent } from './signup';
import { PasswordRecoveryComponent } from './password-recovery';
import { FeaturesComponent } from './features';
import { PricingComponent } from './pricing';
import { FeedbackComponent } from './feedback';


const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: 'app',
        loadChildren: () => import('./dashboard/src/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'account',
        loadChildren: () => import('./account-settings/src/account-settings.module').then(m => m.AccountSettingsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'meet',
        loadChildren: () => import('./meet/src/meet.module').then(m => m.MeetModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/src/auth.module').then(m => m.AuthModule)
    },
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'password-recovery', component: PasswordRecoveryComponent},
    {path: 'features', component: FeaturesComponent},
    {path: 'pricing', component: PricingComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'leave-feedback', component: FeedbackComponent},

    // otherwise redirect to home
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        initialNavigation: 'enabled',
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
