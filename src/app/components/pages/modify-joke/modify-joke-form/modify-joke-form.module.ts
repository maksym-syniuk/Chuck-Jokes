import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ModifyJokeFormComponent } from './modify-joke-form.component';

@NgModule({
  declarations: [ModifyJokeFormComponent],
  imports: [SharedModule],
  exports: [ModifyJokeFormComponent],
})
export class ModifyJokeFormModule {}
