import { FavouritesComponent } from './../favourites/favourites.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { SidebarComponent } from './sidebar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [SidebarComponent],
    imports: [SharedModule],
    exports: [SidebarComponent, RouterModule]
})

export class SidebarModule { }

