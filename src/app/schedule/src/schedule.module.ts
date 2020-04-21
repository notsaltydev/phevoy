import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { ScheduleService } from "./services/schedule";


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [ScheduleService]
})
export class ScheduleModule {
}
