import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../shared/guards/auth.guard';
import { SharedModule } from '../../../shared/shared.module';
import { FavoritesComponent } from './favorites.component';

const routes: Routes = [
  { path: '', component: FavoritesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [FavoritesComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesModule {}
