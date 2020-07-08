import { JokeCategory } from '../../shared/enums/JokeCategory';
import { JokeControl } from '../../shared/enums/JokeControl';
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
        search: new FormControl('', Validators.minLength(3)),
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
        .searchJokes(this.jokeForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((jokes: JokeApi[]) => {
          this.jokesService.changeJokes(
            this.jokesMapperService.mapJokeApiForJokes(jokes)
          );
        });
      this.searchValue.reset();
    } else {
      this.jokesService
        .getJoke(this.jokeForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((jokes: JokeApi) => {
          this.jokesService.changeJokes(
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
