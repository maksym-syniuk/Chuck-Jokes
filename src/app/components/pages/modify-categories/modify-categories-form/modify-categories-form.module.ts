import { SharedModule } from './../../../../shared/shared.module';
import { ModifyCategoriesFormComponent } from './modify-categories-form.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ModifyCategoriesFormComponent],
  imports: [SharedModule],
  exports: [ModifyCategoriesFormComponent],
})
export class ModifyCategoriesFormModule {}
