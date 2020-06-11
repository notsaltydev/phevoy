import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AccountSettingsComponent,
    AuthetnicationSettingsComponent,
    InternationalizationSettingsComponent,
    NotificationSettingsComponent,
    PlansAndPaymentComponent,
    ProfileSettingsComponent
} from './components';
import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { CoreModule } from '../../core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const COMPONENTS = [
    AccountSettingsComponent,
    ProfileSettingsComponent,
    AuthetnicationSettingsComponent,
    InternationalizationSettingsComponent,
    NotificationSettingsComponent,
    PlansAndPaymentComponent
];

@NgModule({
    imports: [
        CommonModule,
        AccountSettingsRoutingModule,
        CoreModule,
        FontAwesomeModule
    ],
    declarations: [
        ...COMPONENTS
    ]
})
export class AccountSettingsModule {
}
