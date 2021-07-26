import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Directive } from '@angular/core';
import {
    AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors
} from '@angular/forms';

import { JokesService } from '../services/jokes.service';

@Directive({
  selector: '[appExistingCategory]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ExistingCategoryValidatorDirective,
      multi: true,
    },
  ],
})
export class ExistingCategoryValidatorDirective implements AsyncValidator {
  constructor(private jokesService: JokesService) {}

  validate(control: AbstractControl): Observable<ValidationErrors> | null {
    return timer(500).pipe(
      switchMap(() => {
        return this.jokesService
          .checkExistCategories(control.value)
          .pipe(
            map((response) => (response ? { existingCategories: true } : null))
          );
      })
    );
  }
}
