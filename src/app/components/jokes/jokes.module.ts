import { ReactiveFormsModule } from '@angular/forms';
import { JokesComponent } from './jokes.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [JokesComponent],
    imports: [SharedModule, ReactiveFormsModule],
    exports: [JokesComponent]
})

export class JokesModule {

}
