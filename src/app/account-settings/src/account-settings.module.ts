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


@NgModule({
    imports: [
        CommonModule,
        AccountSettingsRoutingModule
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
