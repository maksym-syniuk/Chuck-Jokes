import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { AuthGuard } from './../../../../shared/guards/auth.guard';
import { CreateJokeComponent } from './create-joke.component';
import { ModifyJokeFormModule } from './../modify-joke-form/modify-joke-form.module';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: CreateJokeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [CreateJokeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatCardModule,
    ModifyJokeFormModule,
    MatButtonModule,
  ],
  exports: [RouterModule],
})
export class CreateJokeModule {}
