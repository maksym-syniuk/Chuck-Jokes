import { FavoritesComponent } from './favorites.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: FavoritesComponent }
];

@NgModule({
    declarations: [FavoritesComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class FavoritesModule { }
