import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WindowModule } from '../../window';
import { HeaderComponent } from './components/header';


@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        WindowModule
    ],
    declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ]
})
export class CoreModule {
}
