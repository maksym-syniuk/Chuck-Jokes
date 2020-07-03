import { FavouritesComponent } from './favourites.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: FavouritesComponent }
];

@NgModule({
    declarations: [FavouritesComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class FavouritesModule { }
