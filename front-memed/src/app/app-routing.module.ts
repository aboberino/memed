import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemeComponent } from './components/meme/meme.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'meme', component: MemeComponent},
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
