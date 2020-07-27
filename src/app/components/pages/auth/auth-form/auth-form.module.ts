import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { AuthFormComponent } from './auth-form.component';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [SharedModule],
  exports: [AuthFormComponent],
})
export class AuthFormModule {}
