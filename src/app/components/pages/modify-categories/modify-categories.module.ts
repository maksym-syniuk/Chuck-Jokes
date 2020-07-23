import { ModifyCategoriesFormModule } from './modify-categories-form/modify-categories-form.module';
import { AuthGuard } from './../../../shared/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { ModifyCategoriesComponent } from './modify-categories.component';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { Role } from '../../../shared/models/user.model';

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
