import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { JokeFormComponent } from './joke-form.component';

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
