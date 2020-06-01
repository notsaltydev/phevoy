import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header';
import { OneColumnLayoutComponent } from './layouts/one-column/one-column.layout';
import { NbActionsModule, NbIconModule, NbLayoutModule, NbSearchModule, NbSidebarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

const NB_MODULES = [
    NbLayoutModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule,
    NbIconModule,
    NbEvaIconsModule,
];

const COMPONENTS = [
    HeaderComponent,
    OneColumnLayoutComponent
];

@NgModule({
    imports: [
        CommonModule,
        ...NB_MODULES
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class ThemeModule {
}
