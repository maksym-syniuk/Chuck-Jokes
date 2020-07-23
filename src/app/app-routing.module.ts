import { HomeComponent } from './components/pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./components/pages/favorites/favorites.module').then(
        (m) => m.FavoritesModule
      ),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./components/pages/error/error-page.module').then(
        (m) => m.ErrorPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/pages/auth/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/pages/auth/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'create-joke',
    loadChildren: () =>
      import(
        './components/pages/modify-joke/create-joke/create-joke.module'
      ).then((m) => m.CreateJokeModule),
  },
  {
    path: 'update-joke/:id',
    loadChildren: () =>
      import(
        './components/pages/modify-joke/update-joke/update-joke.module'
      ).then((m) => m.UpdateJokeModule),
  },
  {
    path: 'modify-categories',
    loadChildren: () =>
      import(
        './components/pages/modify-categories/modify-categories.module'
      ).then((m) => m.ModifyCategoriesModule),
  },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
