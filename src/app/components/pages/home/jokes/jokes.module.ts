import { JokesMapperService } from 'src/app/shared/services/mapper.service';

import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { JokeFormModule } from './joke-form/joke-form.module';
import { JokesComponent } from './jokes.component';

@NgModule({
  declarations: [JokesComponent],
  imports: [SharedModule, JokeFormModule],
  exports: [JokesComponent],
  providers: [JokesMapperService],
})
export class JokesModule {}
