import { JokeFormModule } from './../../home/jokes/joke-form/joke-form.module';
import { JokeFormMode } from './../../../../shared/enums/joke-form-mode.enum';
import { ActivatedRoute } from '@angular/router';
import { JokeInterface, CategoryInterface } from './../../../../shared/interfaces/joke.interface';
import { JokesService } from './../../../../shared/services/jokes.service';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modify-form',
  templateUrl: './modify-form.component.html',
  styleUrls: ['./modify-form.component.scss']
})

export class ModifyFormComponent implements OnInit {
  public jokeFormGroup: FormGroup;
  public allCategories: Array<string>;
  public categories: Array<string> = [];
  public filteredCategories: Observable<string[]>;
  public createdJoke: JokeInterface;
  public jokeFormModeEnum = JokeFormMode;
  private apiCategories: CategoryInterface[];
  public currentMode: string;

  // controls for angular material
  public visible = true;
  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  private formInitResolver = {
    [JokeFormMode.create]: this._initForm.bind(this),
    [JokeFormMode.update]: this._initUpdateForm.bind(this),
    [JokeFormMode.delete]: this._initDeleteForm.bind(this)
  };

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private formBuilder: FormBuilder,
    private jokesService: JokesService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._subscribeToChangingRoutes();
    this._getCategoriesFromApi();
  }

  private _subscribeToChangingRoutes(): void {
    this.route.params.subscribe(params => {
      this.jokesService.changeCurrentJokeMode(params.mode);
      this.currentMode = params.mode;
      this.formInitResolver[params.mode]();
    });
  }

  private _initForm(): void {
    this.jokeFormGroup = this.formBuilder.group({
      value: ['', [Validators.required]],
      url: [''],
      iconUrl: [''],
      categories: [[]]
    });
  }

  private _initUpdateForm(): void {
    this.jokesService.currentSelectedJokeForEditing
      .subscribe((joke: JokeInterface) => {
        this.jokeFormGroup = this.formBuilder.group({
          id: [joke.id, [Validators.required, Validators.min(1)]],
          value: [joke.value, [Validators.required]],
          iconUrl: [joke.iconUrl],
          categories: [joke.categories]
        });
      });
  }

  private _initDeleteForm(): void {
    this.jokeFormGroup = this.formBuilder.group({
      id: [null, [Validators.required, Validators.min(1)]],
    });
  }

  private _getCategoriesFromApi(): void {
    this.jokesService.getCategories().subscribe(categories => {
      this.apiCategories = categories;
      this.allCategories = this._transformCategoriesToStrings(categories);
      if (this.currentMode === JokeFormMode.create || this.currentMode === JokeFormMode.update) {
        this.filteredCategories = this.jokeFormGroup.get('categories').valueChanges.pipe(
          startWith(null as string),
          map((category: string | null) => category ? this._filter(category) : this.allCategories.slice()));
      }
    });
  }

  private _transformCategoriesToStrings(categories: CategoryInterface[]): string[] {
    return categories.map((category: CategoryInterface) => category.title);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCategories.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  private _openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  public onAddCategoryToMaterialChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.categories.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.jokeFormGroup.get('categories').setValue(null);
  }

  public removeCategoryFromMaterialChip(category: string): void {
    const index = this.categories.indexOf(category);
    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  public onCategoryOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = '';
    this.jokeFormGroup.get('categories').setValue(null);
  }

  public onSubmit(): void {
    if (this.jokeFormGroup.valid) {
      const data = this._transformInputDataBeforeSubmit(this.currentMode);
      this._currentModeSelectedSubmit(this.currentMode, data);
      this.jokeFormGroup.reset();
    }
  }

  private _currentModeSelectedSubmit(mode: string, data: JokeInterface | string | number) {
    switch (mode) {
      case JokeFormMode.create:
        return this.jokesService.createJoke(data as JokeInterface).subscribe(joke => {
          this.createdJoke = this.jokesService.checkIfJokeIsFavorite(joke);
          this._openSnackBar(`Joke was successfully ${this.currentMode}d`);
        });
      case JokeFormMode.update:
        return this.jokesService.updateJoke(data as JokeInterface).subscribe(joke => {
          this.createdJoke = this.jokesService.checkIfJokeIsFavorite(joke);
          this._openSnackBar(`Joke was successfully ${this.currentMode}d`);
        });
      case JokeFormMode.delete:
        return this.jokesService.deleteJoke(data as string | number).subscribe(response => {
          this._openSnackBar(`Joke was successfully ${this.currentMode}d`);
        });
    }
  }

  private _transformInputDataBeforeSubmit(mode: string): JokeInterface | number | string {
    const categories = this._getIdsOfCategories(this._checkForUniqueValues(this._checkForEqualValues(this.categories)));
    switch (mode) {
      case JokeFormMode.create:
        return { ...this.jokeFormGroup.value, categories };
      case JokeFormMode.update:
        return { ...this.jokeFormGroup.value, categories };
      case JokeFormMode.delete:
        return this.jokeFormGroup.value.id;
    }
  }

  private _checkForEqualValues(inputValues: string[]): string[] {
    return inputValues.map(value => this.allCategories.includes(value) ? value : null);
  }

  private _checkForUniqueValues(inputValues: string[]): string[] {
    return Array.from(new Set(inputValues));
  }

  private _getIdsOfCategories(categories: string[]): number[] | string[] {
    const ids = [];
    categories.map(category => {
      this.apiCategories.map(ctg => {
        if (category === ctg.title) {
          ids.push(ctg.id);
        }
      });
    }
    );
    return ids;
  }
}
