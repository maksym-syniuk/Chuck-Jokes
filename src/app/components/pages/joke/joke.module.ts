import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../shared/guards/auth.guard';
import { Role } from '../../../shared/models/user.model';
import { SharedModule } from '../../../shared/shared.module';
import { JokeComponent } from './joke.component';

const routes: Routes = [
  {
    path: '',
    component: JokeComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.SUPERADMIN] },
  },
];

@NgModule({
  declarations: [JokeComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JokeModule {}
