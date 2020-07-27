import { JokeFormModule } from './joke-form/joke-form.module';
import { SharedModule } from './../../../../shared/shared.module';
import { JokesMapperService } from 'src/app/shared/services/mapper.service';
import { JokesComponent } from './jokes.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [JokesComponent],
  imports: [SharedModule, JokeFormModule],
  exports: [JokesComponent],
  providers: [JokesMapperService],
})
export class JokesModule {}
