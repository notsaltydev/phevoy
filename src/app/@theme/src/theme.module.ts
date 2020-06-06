import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, PopoverComponent } from './components';
import { OneColumnLayoutComponent } from './layouts/one-column/one-column.layout';
import { NbActionsModule, NbIconModule, NbLayoutModule, NbPopoverModule, NbSearchModule, NbSidebarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RouterModule } from '@angular/router';

const NB_MODULES = [
    NbLayoutModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule,
    NbIconModule,
    NbEvaIconsModule,
    NbPopoverModule
];

const COMPONENTS = [
    HeaderComponent,
    OneColumnLayoutComponent,
    PopoverComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ...NB_MODULES
    ],
    declarations: [
        ...COMPONENTS,

    ],
    exports: [
        ...COMPONENTS
    ]
})
export class ThemeModule {
}
