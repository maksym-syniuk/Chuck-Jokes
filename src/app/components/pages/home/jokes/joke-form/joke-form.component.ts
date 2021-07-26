import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Role } from 'src/app/shared/models/user.model';
import { JokesService } from 'src/app/shared/services/jokes.service';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JokeCategoryEnum } from '../../../../../shared/enums/joke-category.enum';
import { JokeTypeEnum } from '../../../../../shared/enums/joke-type.enum';
import { AuthInterface } from '../../../../../shared/interfaces/auth.interface';
import { CategoryModel, JokeModel } from '../../../../../shared/models/joke.model';
import { AuthService } from '../../../../../shared/services/auth.service';

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
  public isUserLoggedIn: boolean;
  public isSuperAdmin: boolean;
  private unsubscribe = new Subject<void>();

  private formSubmitResolver = {
    [JokeTypeEnum.random]: () =>
      this.getRandomOrByCategoryJoke(JokeTypeEnum.random, null),
    [JokeTypeEnum.top]: () => this.getTopJokes(JokeTypeEnum.top),
    [JokeTypeEnum.categories]: () =>
      this.getRandomOrByCategoryJoke(
        JokeTypeEnum.categories,
        this.jokeForm.get('category').value
      ),
    [JokeTypeEnum.search]: () =>
      this.searchJokes(this.jokeForm.get('search').value),
  };

  constructor(
    private jokesService: JokesService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    this.subscribeToFormTypeValueChanges();
    this._subscribeToGetuserData();
  }

  private _subscribeToGetuserData(): void {
    this.authService.currentUser.subscribe((userData: AuthInterface) => {
      this.isUserLoggedIn = !!userData;
      if (userData) {
        this.isSuperAdmin = userData.user.roles.includes(Role.SUPERADMIN);
      }
    });
  }

  private initForm(): void {
    this.jokeForm = this.formBuilder.group({
      type: [JokeTypeEnum.random],
      top: [JokeTypeEnum.top],
      category: [JokeCategoryEnum.animal],
      search: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  private getCategories(): void {
    this.jokesService
      .getCategories()
      .pipe(
        map((categories: CategoryModel[]) => {
          return categories.map((category: CategoryModel) => category.title);
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe((categoriesData: string[]) => {
        this.categories = categoriesData;
      });
  }

  private subscribeToFormTypeValueChanges(): void {
    this.jokeForm
      .get('type')
      .valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe((type) => {
        this.jokeTypeState = type;
        if (type !== JokeTypeEnum.search) {
          this.jokeForm.get('search').reset();
        }
      });
  }

  private getTopJokes(type: JokeTypeEnum): void {
    this.jokesService.changeLoadingState(true);
    this.jokesService
      .getTopJokes(type)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (jokes: JokeModel[]) => {
          this.jokesService.changeJokes(jokes);
          this.jokesService.changeLoadingState(false);
        },
        (error) => {
          this.jokesService.changeError(error);
          this.jokesService.changeLoadingState(false);
        }
      );
  }

  private getRandomOrByCategoryJoke(
    type: JokeTypeEnum,
    categoryValue: JokeCategoryEnum
  ): void {
    this.jokesService.changeLoadingState(true);
    this.jokesService
      .getJoke(type, categoryValue)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (joke: JokeModel[]) => {
          this.jokesService.changeJokes(joke);
          this.jokesService.changeLoadingState(false);
        },
        (error) => {
          this.jokesService.changeError(error);
          this.jokesService.changeLoadingState(false);
        }
      );
  }

  private searchJokes(searchValue: string): void {
    this.jokesService.changeLoadingState(true);
    this.jokesService
      .searchJokes(searchValue)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (jokes: JokeModel[]) => {
          this.jokesService.changeJokes(jokes);
          this.jokesService.changeLoadingState(false);
        },
        (error) => {
          this.jokesService.changeError(error);
          this.jokesService.changeLoadingState(false);
        }
      );
  }

  public submitForm(): void {
    this.jokesService.changeError('');
    this.formSubmitResolver[this.jokeForm.get('type').value]();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
