import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'favourites',
    loadChildren: () => import('./components/favourites/favourites.module').then(m => m.FavouritesModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./components/error-page/error-page.module').then(m => m.ErrorPageModule)
  },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
