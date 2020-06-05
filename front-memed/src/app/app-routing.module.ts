import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemeComponent } from './components/meme/meme.component';
import { LoginComponent } from './auth/component/login/login.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'meme', component: MemeComponent},
  { path: 'auth/login', component: LoginComponent},
  // Lazy loading users module
  { path: 'users', loadChildren: './users/users.module#UsersModule'},

  // Retour vers home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
