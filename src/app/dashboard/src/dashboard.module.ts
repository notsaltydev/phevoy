import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./components/dashboard";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ConferenceDialogComponent } from './components/conference-dialog/conference-dialog.component';
import { DialogModule } from "../../dialog";


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FontAwesomeModule,
        DialogModule
    ],
    declarations: [DashboardComponent, ConferenceDialogComponent]
})
export class DashboardModule {
}
