import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { JokeCardComponent } from '../components/joke-card/joke-card.component';
import { SquareSpinnerComponent } from './../components/square-spinner/square-spinner.component';
import { DragDropDirective } from './directives/drag-drop.directive';
import { DateToHoursPipe } from './pipes/date-to-hours.pipe';

@NgModule({
  declarations: [
    JokeCardComponent,
    DateToHoursPipe,
    DragDropDirective,
    SquareSpinnerComponent,
  ],
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
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    MatTooltipModule,
    MatDividerModule,
    MatExpansionModule,
    MatProgressBarModule,
  ],
  exports: [
    JokeCardComponent,
    DateToHoursPipe,
    DragDropDirective,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    MatTooltipModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatProgressBarModule,
    SquareSpinnerComponent,
  ],
})
export class SharedModule {}
