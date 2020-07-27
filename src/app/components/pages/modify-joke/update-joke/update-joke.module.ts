import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../../../shared/guards/auth.guard';
import { UpdateJokeComponent } from './update-joke.component';
import { ModifyJokeFormModule } from './../modify-joke-form/modify-joke-form.module';
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
  imports: [SharedModule, RouterModule.forChild(routes), ModifyJokeFormModule],
  exports: [RouterModule],
})
export class UpdateJokeModule {}
