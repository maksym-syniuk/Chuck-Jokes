import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'favorites',
    loadChildren: () => import('./components/favorites/favorites.module').then(m => m.FavoritesModule)
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
