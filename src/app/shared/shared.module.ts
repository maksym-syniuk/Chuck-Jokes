import { LoaderComponent } from './../components/loader/loader.component';
import { JokeCardComponent } from './../components/joke-card/joke-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateToHoursPipe } from './pipes/date-to-hours.pipe';



@NgModule({
  declarations: [JokeCardComponent, LoaderComponent, DateToHoursPipe],
  imports: [CommonModule],
  exports: [JokeCardComponent, LoaderComponent, CommonModule]
})
export class SharedModule { }
