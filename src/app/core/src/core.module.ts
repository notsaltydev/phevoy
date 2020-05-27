import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WindowModule } from '../../window';
import { HeaderComponent } from './components/header';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
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
