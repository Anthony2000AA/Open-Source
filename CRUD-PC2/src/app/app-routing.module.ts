import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeliculasComponent } from './component/peliculas/peliculas.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'business/peliculas', component: PeliculasComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
