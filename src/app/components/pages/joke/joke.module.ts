import { Role } from './../../../shared/models/user.model';
import { AuthGuard } from './../../../shared/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';
import { JokeComponent } from './joke.component';
import { NgModule } from '@angular/core';

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
