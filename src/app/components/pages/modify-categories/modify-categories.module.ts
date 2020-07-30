import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../shared/guards/auth.guard';
import { Role } from '../../../shared/models/user.model';
import { SharedModule } from '../../../shared/shared.module';
import { ModifyCategoriesFormModule } from './modify-categories-form/modify-categories-form.module';
import { ModifyCategoriesComponent } from './modify-categories.component';

const routes: Routes = [
  {
    path: '',
    component: ModifyCategoriesComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.SUPERADMIN] },
  },
];

@NgModule({
  declarations: [ModifyCategoriesComponent],
  imports: [
    SharedModule,
    ModifyCategoriesFormModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ModifyCategoriesModule {}
