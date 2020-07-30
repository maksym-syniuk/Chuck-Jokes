import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../../../shared/shared.module';
import { AuthFormModule } from '../auth-form/auth-form.module';
import { RegisterComponent } from './register.component';

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
