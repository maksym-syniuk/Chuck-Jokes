import { RouterModule } from '@angular/router';
import { JokeCardComponent } from './../components/joke-card/joke-card.component';
import { LoaderComponent } from './../components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateToHoursPipe } from './pipes/date-to-hours.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [JokeCardComponent, LoaderComponent, DateToHoursPipe],
  imports: [CommonModule, RouterModule, MatIconModule, MatSnackBarModule],
  exports: [JokeCardComponent, LoaderComponent, CommonModule, RouterModule],
})
export class SharedModule {}
