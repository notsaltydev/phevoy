import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard';
import { DashboardContentComponent } from './components/dashboard-content';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { RecentContentComponent } from './components/recent-content/recent-content.component';

const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardContentComponent,
            },
            {
                path: 'calendar',
                component: SchedulerComponent,
            },
            {
                path: 'recent',
                component: RecentContentComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
