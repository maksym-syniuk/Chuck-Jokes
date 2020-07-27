import {
  JokeModel,
  CategoryModel,
} from './../../../../shared/models/joke.model';
import { JokesService } from './../../../../shared/services/jokes.service';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modify-joke-form',
  templateUrl: './modify-joke-form.component.html',
  styleUrls: ['./modify-joke-form.component.scss'],
})
export class ModifyJokeFormComponent implements OnInit {
  @Input() updateJokeMode: boolean;
  @Output() submitForm = new EventEmitter<JokeModel>();
  @Input()
  get joke(): JokeModel {
    return this.jokeModel;
  }
  set joke(joke: JokeModel) {
    this.jokeModel = joke;
    if (this.jokeModel && this.jokeModel.id) {
      this.form.patchValue(this.jokeModel);
    }
  }

  public jokeModel: JokeModel;
  public form: FormGroup;
  public categories: CategoryModel[];

  constructor(
    private formBuilder: FormBuilder,
    private jokesService: JokesService
  ) {}

  ngOnInit(): void {
    this._getCategories();
    this._initForm(this.jokeModel);
  }

  private _getCategories(): void {
    this.jokesService
      .getCategories()
      .subscribe((categories: CategoryModel[]) => {
        this.categories = categories;
        this.jokesService.changeCategories(categories);
      });
  }

  private _initForm(joke: JokeModel): void {
    this.form = this.formBuilder.group({
      value: [joke.value, [Validators.required, Validators.minLength(3)]],
      url: [joke.url, Validators.minLength(5)],
      iconUrl: [joke.iconUrl, Validators.minLength(5)],
      categories: [
        joke.categories
          ? joke.categories.map((category) => category.title)
          : null,
      ],
    });
    if (this.updateJokeMode) {
      const idControl = new FormControl({ value: joke.id, disabled: true }, [
        Validators.required,
        Validators.min(1),
      ]);
      this.form.addControl('id', idControl);
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.getRawValue());
    }
  }
}
