import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    AccountSettingsComponent,
    AuthetnicationSettingsComponent,
    InternationalizationSettingsComponent,
    NotificationSettingsComponent,
    ProfileSettingsComponent
} from './components';

const routes: Routes = [
    {path: '', redirectTo: 'profile', pathMatch: 'full'},
    {
        path: '',
        component: AccountSettingsComponent,
        children: [
            {
                path: 'profile',
                component: ProfileSettingsComponent,
            },
            {
                path: 'authentication',
                component: AuthetnicationSettingsComponent,
            },
            {
                path: 'internationalization',
                component: InternationalizationSettingsComponent,
            },
            {
                path: 'notifications',
                component: NotificationSettingsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountSettingsRoutingModule {
}
