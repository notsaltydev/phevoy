import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent, LoginComponent, LogoutComponent, RegisterComponent, ResetPasswordComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
    declarations: [
        AuthComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        ResetPasswordComponent
    ]
})
export class AuthModule {
}
