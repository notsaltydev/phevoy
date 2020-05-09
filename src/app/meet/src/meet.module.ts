import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetComponent } from './components/meet';
import { MeetRoutingModule } from './meet-routing.module';
import { MeetIdResolver } from './resolvers/meet-id';
import { NbButtonModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';


@NgModule({
    imports: [
        CommonModule,
        MeetRoutingModule,
        NbThemeModule,
        NbLayoutModule,
        NbButtonModule
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