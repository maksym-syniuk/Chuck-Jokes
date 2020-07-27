import { AuthFormModule } from './../auth-form/auth-form.module';
import { SharedModule } from './../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: RegisterComponent }];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AuthFormModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class RegisterModule {}
