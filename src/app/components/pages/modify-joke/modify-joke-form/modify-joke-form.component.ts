import { ImageModel } from './../../../../shared/models/image.model';
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
  private imageData: ImageModel[] = [];
  private fileList: FileList;
  private imagesData = [];

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
      imageNames: [joke.imageNames],
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
      this.imageData = this.joke.imageUrls;
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const data = {
        ...this.form.getRawValue(),
        imagesData: this.imagesData,
      };
      this.submitForm.emit(data);
    }
  }

  public onChange(event): void {
    this.fileList = event.target.files;
    Array.from(this.fileList).map((file: File) => {
      const fileExtension = file.name.split('.').pop();
      this.jokesService
        .getImageUrl(fileExtension)
        .subscribe((imageData: ImageModel) =>
          this.imagesData.push({ imageData, file })
        );
    });

    // this.jokesService
    //   .getImageUrl(fileExtension)
    //   .subscribe((imageData: ImageModel) => {
    //     this.jokesService
    //       .uploadImage(imageData.imageUploadUrl, file)
    //       .subscribe(() => {
    //         this.imageNames.push(imageData.imageName);
    //       });
    //   });
    // let arrayBuffer: string | ArrayBuffer;
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   // when file has loaded
    //   arrayBuffer = reader.result;
    // };
    // this.jokesService
    //   .getImageUrl(fileExtension)
    //   .subscribe((imageData: ImageModel) => {
    //     this.jokesService
    //       .uploadImage(imageData.imageUploadUrl, arrayBuffer)
    //       .subscribe((response) => console.log(response));
    //   });
  }
}
