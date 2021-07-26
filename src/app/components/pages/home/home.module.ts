import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { HomeComponent } from './home.component';
import { JokesModule } from './jokes/jokes.module';
import { SidebarModule } from './sidebar/sidebar.module';

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
