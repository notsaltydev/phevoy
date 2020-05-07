import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AccountSettingsComponent,
    AuthetnicationSettingsComponent,
    InternationalizationSettingsComponent,
    NotificationSettingsComponent,
    PersonalInfoSettingsComponent,
    ProfileSettingsComponent
} from './components';
import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { NbCardModule, NbLayoutModule, NbMenuModule, NbRouteTabsetModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
    imports: [
        CommonModule,
        AccountSettingsRoutingModule,
        NbThemeModule,
        NbLayoutModule,
        NbSidebarModule,
        NbMenuModule,
        NbEvaIconsModule,
        NbRouteTabsetModule,
        NbCardModule
    ],
    declarations: [
        AccountSettingsComponent,
        ProfileSettingsComponent,
        AuthetnicationSettingsComponent,
        InternationalizationSettingsComponent,
        PersonalInfoSettingsComponent,
        NotificationSettingsComponent
    ]
})
export class AccountSettingsModule {
}
