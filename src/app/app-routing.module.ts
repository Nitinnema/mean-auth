import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './adduser/adduser.component';
import { UserLoginComponent } from './authorisation/userlogin/userlogin.component';
import { UserHomeComponent } from './userhome/userhome.component';
import { CitiesComponent } from './cities/cities.component';
import { AuthGuard } from './services/authguard';

const routes: Routes = [
  { path: 'customModule', loadChildren: './customModule/customModule.module#CustomModule' },
  { path: 'welcome/add', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'welcome/cities', component: CitiesComponent, canActivate: [AuthGuard] },
  { path: 'welcome', component: UserHomeComponent, canActivate: [AuthGuard] },
  { path: 'edit/:userId', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: '', component: UserLoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
