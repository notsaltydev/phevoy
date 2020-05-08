import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetComponent } from './components/meet';
import { MeetRoutingModule } from './meet-routing.module';
import { MeetIdResolver } from './resolvers/meet-id';


@NgModule({
    imports: [
        CommonModule,
        MeetRoutingModule
    ],
    declarations: [
        MeetComponent
    ],
    providers: [
        MeetIdResolver
    ]
})
export class MeetModule {
}
