import { ReactiveFormsModule } from '@angular/forms';
import { ModifyFormComponent } from './modify-form.component';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
    declarations: [ModifyFormComponent],
    imports: [
        SharedModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        MatCardModule,
        MatSnackBarModule,
        MatGridListModule
    ],
    exports: [ModifyFormComponent]
})
export class ModifyFormModule { }
