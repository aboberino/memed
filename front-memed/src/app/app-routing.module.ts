import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemeComponent } from './components/meme/meme.component';
import { LoginComponent } from './auth/component/login/login.component';
import { RegisterComponent } from './auth/component/register/register.component';
import { AuthGuardService } from './core/service/auth-guard.service';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'meme', component: MemeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  // Lazy loading users module
  { path: 'users', loadChildren: './users/users.module#UsersModule', canLoad: [AuthGuardService]},

  // Retour vers home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
