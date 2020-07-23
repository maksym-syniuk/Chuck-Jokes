import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JokeCardComponent } from './../components/joke-card/joke-card.component';
import { LoaderComponent } from './../components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateToHoursPipe } from './pipes/date-to-hours.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [JokeCardComponent, LoaderComponent, DateToHoursPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
  ],
  exports: [
    JokeCardComponent,
    ReactiveFormsModule,
    LoaderComponent,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class SharedModule {}
