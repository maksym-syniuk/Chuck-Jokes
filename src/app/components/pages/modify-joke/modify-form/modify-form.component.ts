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
  private apiCategories: CategoryInterface[];

  // controls for angular material
  public visible = true;
  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private formBuilder: FormBuilder,
    private jokesService: JokesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
    this._getCategoriesFromApi();
  }

  private initForm(): void {
    this.jokeFormGroup = this.formBuilder.group({
      value: ['', [Validators.required]],
      url: [''],
      iconUrl: [''],
      categories: [[]]
    });
  }

  private _getCategoriesFromApi(): void {
    this.jokesService.getCategories().subscribe(categories => {
      this.apiCategories = categories;
      console.log(categories);
      this.allCategories = this._transformCategoriesToStrings(categories);
      this.filteredCategories = this.jokeFormGroup.get('categories').valueChanges.pipe(
        startWith(null as string),
        map((category: string | null) => category ? this._filter(category) : this.allCategories.slice()));
    });
  }

  private _transformCategoriesToStrings(categories: CategoryInterface[]): string[] {
    return categories.map((category: CategoryInterface) => category.title);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCategories.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  private _openSnackBar() {
    this.snackBar.open('Joke Created!', 'Close', {
      duration: 2000,
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
      this._openSnackBar();
      const data = this._transformInputDataBeforeSubmit();
      this.jokesService.createJoke(data).subscribe(joke => this.createdJoke = joke);
    }
  }

  private _transformInputDataBeforeSubmit(): JokeInterface {
    const categories = this._getIdsOfCategories(this._checkForUniqueValues(this._checkForEqualValues(this.categories)));
    return { ...this.jokeFormGroup.value, categories };
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
