import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import {
    ExistingCategoryValidatorDirective
} from '../../../../shared/validators/existing-category-validator.directive';
import { ModifyCategoriesFormComponent } from './modify-categories-form.component';

@NgModule({
  declarations: [
    ModifyCategoriesFormComponent,
    ExistingCategoryValidatorDirective,
  ],
  imports: [SharedModule],
  exports: [ModifyCategoriesFormComponent],
})
export class ModifyCategoriesFormModule {}
