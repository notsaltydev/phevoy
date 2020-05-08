import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetComponent } from './components/meet';
import { MeetRoutingModule } from './meet-routing.module';


@NgModule({
    imports: [
        CommonModule,
        MeetRoutingModule
    ],
    declarations: [MeetComponent]
})
export class MeetModule {
}
