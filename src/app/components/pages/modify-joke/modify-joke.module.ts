import { AuthGuard } from './../../../shared/guards/auth.guard';
import { ModifyFormModule } from './modify-form/modify-form.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';
import { ModifyJokeComponent } from './modify-joke.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: ModifyJokeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [ModifyJokeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    ModifyFormModule,
    MatButtonModule
  ],
  exports: [RouterModule]
})
export class ModifyJokeModule { }
