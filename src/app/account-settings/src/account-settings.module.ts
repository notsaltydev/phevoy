import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuillModule } from 'ngx-quill';
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
        FontAwesomeModule,
        QuillModule
    ],
    declarations: [
        ...COMPONENTS
    ]
})
export class AccountSettingsModule {
}
