import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./components/dashboard";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FontAwesomeModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule {
}
