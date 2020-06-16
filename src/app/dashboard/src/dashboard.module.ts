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
    NbCheckboxModule,
    NbDatepickerModule,
    NbDialogModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbMenuModule,
    NbPopoverModule,
    NbSelectModule,
    NbSidebarModule,
    NbTabsetModule,
    NbThemeModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DashboardContentComponent } from './components/dashboard-content';
import { OrderByPipe } from './pipes/order-by';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { CalendarModule } from 'angular-calendar';
import { ScheduleDialogComponent } from './components/schedule-dialog/schedule-dialog.component';
import { RecentContentComponent } from './components/recent-content/recent-content.component';
import { ConferenceItemComponent } from './components/conference-item/conference-item.component';
import { EmptyStateConferenceComponent } from './components/empty-state-conference/empty-state-conference.component';
import { ConferenceFormComponent } from './components/conference-form/conference-form.component';
import { PreferencesDialogComponent } from './components/preferences-dialog/preferences-dialog.component';
import { FeedbackDialogComponent } from './components/feedback-dialog/feedback-dialog.component';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';
import { ThemeModule } from '../../@theme';
import { QuillModule } from 'ngx-quill';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        ThemeModule,
        DialogModule,
        NbThemeModule,
        NbLayoutModule,
        NbEvaIconsModule,
        NbSidebarModule,
        NbButtonModule,
        NbDialogModule.forChild(),
        NbCardModule,
        NbInputModule,
        NbDatepickerModule,
        NbSelectModule,
        CalendarModule,
        NbMenuModule,
        NbPopoverModule,
        NbIconModule,
        NbTabsetModule,
        NbCheckboxModule,
        QuillModule
    ],
    declarations: [
        DashboardComponent,
        ConferenceDialogComponent,
        DashboardContentComponent,
        OrderByPipe,
        SchedulerComponent,
        ScheduleDialogComponent,
        RecentContentComponent,
        ConferenceItemComponent,
        EmptyStateConferenceComponent,
        ConferenceFormComponent,
        PreferencesDialogComponent,
        FeedbackDialogComponent,
        HelpDialogComponent
    ]
})
export class DashboardModule {
}
