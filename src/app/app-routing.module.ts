import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/guards';
import { HomeComponent } from './home';
import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { PageNotFoundComponent } from './page-not-found';
import { ContactComponent } from './contact';
import { SignupComponent } from './signup';
import { PasswordRecoveryComponent } from './password-recovery';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'contact', component: ContactComponent },

  // otherwise redirect to home
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
