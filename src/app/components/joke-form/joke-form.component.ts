import { JokeTypeEnum } from './../../shared/enums/joke-type.enum';
import { JokeCategoryEnum } from '../../shared/enums/joke-category.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JokesService } from 'src/app/shared/services/jokes.service';
import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';
import { JokesMapperService } from 'src/app/shared/services/jokes-mapper.service';
import { JokeApi } from 'src/app/shared/interfaces/JokeApi';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-joke-form',
  templateUrl: './joke-form.component.html',
  styleUrls: ['./joke-form.component.scss'],
})
export class JokeFormComponent implements OnInit, OnDestroy {
  public jokeForm: FormGroup;
  public categories: string[] = [];
  public jokeTypeEnum = JokeTypeEnum;
  public jokeTypeState: string;
  public errorMessage: HttpErrorResponse;
  private unsubscribe = new Subject<void>();

  private formSubmitResolver = {
    [JokeTypeEnum.random]: () => this.getRandomOrByCategoryJoke(JokeTypeEnum.random, null),
    [JokeTypeEnum.categories]: () => this.getRandomOrByCategoryJoke(JokeTypeEnum.categories, this.jokeForm.get('category').value),
    [JokeTypeEnum.search]: () => this.searchJokes(this.jokeForm.get('search').value),
  };

  constructor(
    private jokesService: JokesService,
    private jokesMapperService: JokesMapperService
  ) { }

  private getRandomOrByCategoryJoke(type: JokeTypeEnum, categoryValue: JokeCategoryEnum): void {
    this.jokesService.changeLoadingState(true);
    this.jokesService
      .getJoke(type, categoryValue)
      .pipe(
        delay(500),
        takeUntil(this.unsubscribe)
      )
      .subscribe(
        (joke: JokeApi) => {
          this.jokesService.changeJokes(
            this.jokesMapperService.mapJokeApiForJokes([joke])
          );
          this.jokesService.changeLoadingState(false);
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error;
        });
  }

  private searchJokes(searchValue: string): void {
    this.jokesService.changeLoadingState(true);
    this.jokesService
      .searchJokes(searchValue)
      .pipe(
        delay(500),
        takeUntil(this.unsubscribe)
      )
      .subscribe((jokes: JokeApi[]) => {
        this.jokesService.changeJokes(
          this.jokesMapperService.mapJokeApiForJokes(jokes)
        );
        this.jokesService.changeLoadingState(false);
      });
  }

  private initForm(): void {
    this.jokeForm = new FormGroup({
      type: new FormControl(JokeTypeEnum.random),
      category: new FormControl(JokeCategoryEnum.animal),
      search: new FormControl(null, Validators.minLength(3)),
    });
  }

  private getCategories(): void {
    this.jokesService
      .getCategories()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((categoriesArr: string[]) => {
        this.categories = [...categoriesArr];
      });
  }

  private onValueChanges(): void {
    this.jokeForm.get('type').valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(type => {
        this.jokeTypeState = type;
        if (type !== JokeTypeEnum.search) {
          this.jokeForm.get('search').reset();
        }
      });
  }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    this.onValueChanges();
  }

  public submitForm(): void {
    if (this.jokeForm.valid) {
      this.formSubmitResolver[this.jokeForm.get('type').value]();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
