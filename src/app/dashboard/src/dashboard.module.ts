import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConferenceDialogComponent } from './components/conference-dialog';
import { DialogModule } from '../../dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    NbButtonModule,
    NbCardModule,
    NbDatepickerModule,
    NbDialogModule,
    NbInputModule,
    NbLayoutModule,
    NbSelectModule,
    NbSidebarModule,
    NbThemeModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DashboardContentComponent } from './components/dashboard-content';
import { OrderByPipe } from './pipes/order-by';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { CalendarModule } from 'angular-calendar';
import { ScheduleDialogComponent } from './components/schedule-dialog/schedule-dialog.component';
import { RecentContentComponent } from './components/recent-content/recent-content.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        FontAwesomeModule,
        DialogModule,
        NbThemeModule,
        NbLayoutModule,
        NbEvaIconsModule,
        NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
        NbButtonModule,
        NbDialogModule.forChild(),
        NbCardModule,
        NbInputModule,
        NbDatepickerModule,
        NbSelectModule,
        CalendarModule
    ],
    declarations: [
        DashboardComponent,
        ConferenceDialogComponent,
        DashboardContentComponent,
        OrderByPipe,
        SchedulerComponent,
        ScheduleDialogComponent,
        RecentContentComponent
    ]
})
export class DashboardModule {
}
