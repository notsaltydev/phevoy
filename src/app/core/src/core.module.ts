import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WindowModule } from '../../window';
import { FooterComponent, HeaderComponent } from './components';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        WindowModule
    ],
    declarations: [
        FooterComponent,
        HeaderComponent
    ],
    exports: [
        FooterComponent,
        HeaderComponent
    ]
})
export class CoreModule {
}
