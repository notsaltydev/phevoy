import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/src/guards';
import { HomeComponent } from './home';
import { PageNotFoundComponent } from './page-not-found';
import { ContactComponent } from './contact';
import { FeaturesComponent } from './features';
import { PricingComponent } from './pricing';
import { FeedbackComponent } from './feedback';
import { SupportCenterComponent } from './support-center';
import { FaqComponent } from './faq';
import { GdprGuideComponent } from './gdpr-guide';
import { ScheduleDemoComponent } from './schedule-demo';
import { PrivacyPolicyComponent } from './privacy-policy';
import { TermsOfServiceComponent } from './terms-of-service';
import { ImprintComponent } from './imprint';


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
    {path: 'features', component: FeaturesComponent},
    {path: 'pricing', component: PricingComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'leave-feedback', component: FeedbackComponent},
    {path: 'support-center', component: SupportCenterComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'gdpr-guide', component: GdprGuideComponent},
    {path: 'schedule-demo', component: ScheduleDemoComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'terms-of-service', component: TermsOfServiceComponent},
    {path: 'imprint', component: ImprintComponent},

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
