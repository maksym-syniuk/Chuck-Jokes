import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { RegisterComponent } from './register.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: RegisterComponent }
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RegisterModule { }
