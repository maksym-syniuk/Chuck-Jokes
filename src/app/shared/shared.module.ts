import { JokeCardComponent } from './../components/joke-card/joke-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [JokeCardComponent],
  imports: [CommonModule],
  exports: [JokeCardComponent, CommonModule]
})
export class SharedModule { }
