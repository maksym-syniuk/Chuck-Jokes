import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { JokeFormComponent } from './joke-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [JokeFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  exports: [JokeFormComponent, RouterModule],
})
export class JokeFormModule {}
