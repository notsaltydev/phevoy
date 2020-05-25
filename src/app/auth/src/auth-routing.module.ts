import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    AuthComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    RequestPasswordComponent,
    ResetPasswordComponent
} from './components';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                component: LoginComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'logout',
                component: LogoutComponent,
            },
            {
                path: 'request-password',
                component: RequestPasswordComponent,
            },
            {
                path: 'reset-password',
                component: ResetPasswordComponent,
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
