import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [DialogComponent],
    exports: [DialogComponent],
    entryComponents: [DialogComponent],
})
export class DialogModule {
}
