import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class LoginModule { }
