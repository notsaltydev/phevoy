import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConferenceDialogComponent } from './components/conference-dialog';
import { DialogModule } from '../../dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbLayoutModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DashboardContentComponent } from './components/dashboard-content';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        FontAwesomeModule,
        DialogModule,
        NbThemeModule.forRoot({name: 'corporate'}),
        NbLayoutModule,
        NbEvaIconsModule,
        NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
        NbButtonModule,
    ],
    declarations: [DashboardComponent, ConferenceDialogComponent, DashboardContentComponent]
})
export class DashboardModule {
}
