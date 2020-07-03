import { RouterModule } from '@angular/router';
import { SidebarModule } from './../sidebar/sidebar.module';
import { SharedModule } from './../../shared/shared.module';
import { JokesModule } from './../jokes/jokes.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    SidebarModule,
    JokesModule,
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
