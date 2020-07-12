import { LoaderComponent } from './../components/loader/loader.component';
import { JokeCardComponent } from './../components/joke-card/joke-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [JokeCardComponent, LoaderComponent],
  imports: [CommonModule],
  exports: [JokeCardComponent, LoaderComponent, CommonModule]
})
export class SharedModule { }
