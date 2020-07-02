import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JokesComponent } from './components/jokes/jokes.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { JokeContentComponent } from './components/jokes/joke-content/joke-content.component';

@NgModule({
  declarations: [
    AppComponent,
    JokesComponent,
    FavouriteComponent,
    JokeContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
