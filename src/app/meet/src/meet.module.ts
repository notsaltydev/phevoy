import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetComponent } from './components/meet';
import { MeetRoutingModule } from './meet-routing.module';
import { MeetIdResolver } from './resolvers/meet-id';
import { CoreModule } from '../../core';
import { PlatformModule } from '../../platform';


@NgModule({
    imports: [
        CommonModule,
        MeetRoutingModule,
        CoreModule,
        PlatformModule
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
