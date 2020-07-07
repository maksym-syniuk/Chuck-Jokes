import { JokeCategory } from '../../shared/enums/JokeCategory';
import { JokeControl } from '../../shared/enums/JokeControl';
import { JokeApiArr } from '../../shared/interfaces/JokeApiArr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JokesService } from 'src/app/shared/services/jokes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JokesMapperService } from 'src/app/shared/services/jokes-mapper.service';
import { JokeApi } from 'src/app/shared/interfaces/JokeApi';

@Component({
  selector: 'app-joke-form',
  templateUrl: './joke-form.component.html',
  styleUrls: ['./joke-form.component.scss'],
})
export class JokeFormComponent implements OnInit, OnDestroy {
  public jokeForm: FormGroup;
  public categories: string[] = [];
  public controlState: string;
  public JokeControlEnum = JokeControl;
  public JokeCategoryEnum = JokeCategory;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private jokesService: JokesService,
    private jokesMapperService: JokesMapperService
  ) { }

  ngOnInit(): void {
    this.jokeForm = new FormGroup({
      jokeControl: new FormControl(this.JokeControlEnum.random),
      jokeCategoryGroup: new FormGroup({
        category: new FormControl(this.JokeCategoryEnum.animal),
      }),
      jokeSearchGroup: new FormGroup({
        search: new FormControl('', Validators.minLength(4)),
      }),
    });

    this.jokeForm
      .get('jokeControl')
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => (this.controlState = value));

    this.onSubmitForm();

    this.getCategories();
  }

  get searchValue() {
    return this.jokeForm.get('jokeSearchGroup.search');
  }

  onSubmitForm(): void {
    if (
      this.jokeForm.value.jokeControl === this.JokeControlEnum.search &&
      this.searchValue.valid
    ) {
      this.jokesService
        .searchJoke(this.jokeForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((jokes: JokeApiArr) => {
          this.jokesService.setJokes(
            this.jokesMapperService.mapJokeApiArrForJokes(jokes)
          );
        });
      this.searchValue.reset();
    } else {
      this.jokesService
        .getJokes(this.jokeForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((jokes: JokeApi) => {
          this.jokesService.setJokes(
            this.jokesMapperService.mapJokeApiForJokes(Array.of(jokes))
          );
        });
    }
  }

  getCategories(): void {
    this.jokesService
      .getCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((categoriesArr: string[]) => {
        this.categories = [...categoriesArr];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
