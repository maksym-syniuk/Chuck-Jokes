import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../../../shared/shared.module';
import { AuthFormModule } from '../auth-form/auth-form.module';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [{ path: '', component: ResetPasswordComponent }];

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [SharedModule, AuthFormModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordModule {}
