import { RouterModule } from '@angular/router';
import { JokeCardComponent } from './../components/joke-card/joke-card.component';
import { LoaderComponent } from './../components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateToHoursPipe } from './pipes/date-to-hours.pipe';

@NgModule({
  declarations: [JokeCardComponent, LoaderComponent, DateToHoursPipe],
  imports: [CommonModule, RouterModule],
  exports: [JokeCardComponent, LoaderComponent, CommonModule, RouterModule]
})
export class SharedModule { }
