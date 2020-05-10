import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetComponent } from './components/meet';
import { MeetIdResolver } from './resolvers/meet-id';

const routes: Routes = [
    {
        path: ':id',
        component: MeetComponent,
        resolve: {
            meetId: MeetIdResolver
        }
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
