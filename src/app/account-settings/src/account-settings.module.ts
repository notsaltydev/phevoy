import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './components';
import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { CoreModule } from '../../core';

const COMPONENTS = [
    AccountSettingsComponent,
    // ProfileSettingsComponent,
    // AuthetnicationSettingsComponent,
    // InternationalizationSettingsComponent,
    // PersonalInfoSettingsComponent,
    // NotificationSettingsComponent
];

@NgModule({
    imports: [
        CommonModule,
        AccountSettingsRoutingModule,
        CoreModule
    ],
    declarations: [
        ...COMPONENTS
    ]
})
export class AccountSettingsModule {
}
