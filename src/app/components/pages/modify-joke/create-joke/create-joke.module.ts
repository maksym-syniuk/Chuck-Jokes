import { Role } from 'src/app/shared/models/user.model';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../../shared/guards/auth.guard';
import { SharedModule } from '../../../../shared/shared.module';
import { ModifyJokeFormModule } from '../modify-joke-form/modify-joke-form.module';
import { CreateJokeComponent } from './create-joke.component';

const routes: Routes = [
  {
    path: '',
    component: CreateJokeComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.SUPERADMIN] },
  },
];

@NgModule({
  declarations: [CreateJokeComponent],
  imports: [SharedModule, RouterModule.forChild(routes), ModifyJokeFormModule],
  exports: [RouterModule],
})
export class CreateJokeModule {}
