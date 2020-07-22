import { JokeFormModule } from './joke-form/joke-form.module';
import { JokeFormComponent } from './joke-form/joke-form.component';
import { SharedModule } from './../../../../shared/shared.module';
import { JokesMapperService } from 'src/app/shared/services/jokes-mapper.service';
import { ReactiveFormsModule } from '@angular/forms';
import { JokesComponent } from './jokes.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [JokesComponent],
    imports: [SharedModule, JokeFormModule],
    exports: [JokesComponent],
    providers: [JokesMapperService]
})

export class JokesModule {

}
