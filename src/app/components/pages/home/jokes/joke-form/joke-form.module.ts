import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { JokeFormComponent } from './joke-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [JokeFormComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [JokeFormComponent, RouterModule],
})
export class JokeFormModule {}
