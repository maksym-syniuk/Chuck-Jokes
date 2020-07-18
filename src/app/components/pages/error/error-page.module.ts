import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: ErrorPageComponent }
];

@NgModule({
    declarations: [ErrorPageComponent],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class ErrorPageModule { }
