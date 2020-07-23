import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { AuthGuard } from './../../../../shared/guards/auth.guard';
import { UpdateJokeComponent } from './update-joke.component';
import { ModifyJokeFormModule } from './../modify-joke-form/modify-joke-form.module';
import { MatButtonModule } from '@angular/material/button';
import { Role } from 'src/app/shared/models/user.model';

const routes: Routes = [
  {
    path: '',
    component: UpdateJokeComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.SUPERADMIN] },
  },
];

@NgModule({
  declarations: [UpdateJokeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ModifyJokeFormModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [RouterModule],
})
export class UpdateJokeModule {}
