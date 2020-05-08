import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetComponent } from './components/meet';

const routes: Routes = [
    {
        path: ':id',
        component: MeetComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MeetRoutingModule {
}
