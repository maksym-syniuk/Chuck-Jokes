import { map } from 'rxjs/operators';
import { Observable, Subscription, zip } from 'rxjs';
import { ImageModel } from 'src/app/shared/models/image.model';
import { JokesService } from 'src/app/shared/services/jokes.service';

import { Component } from '@angular/core';

import { CategoryModel, JokeModel } from '../../../../shared/models/joke.model';

@Component({
  selector: 'app-create-joke',
  templateUrl: './create-joke.component.html',
  styleUrls: ['./create-joke.component.scss'],
})
export class CreateJokeComponent {
  public joke = new JokeModel();
  public createdJoke: JokeModel;

  constructor(private jokesService: JokesService) {}

  public onJokeCreate(joke: any): void {
    joke.categories = this._transformCategoriesToId(joke.categories);
    zip(...this._getImageNamesAsObservables(joke.imagesData)).subscribe(
      (imageNames) => {
        joke.imageNames = imageNames;
        this._createJoke(joke);
      }
    );
  }

  private _transformCategoriesToId(categories: string[]): (number | string)[] {
    return categories
      ? categories.map((category) =>
          this.jokesService.transformCategoryStringToId(category)
        )
      : [];
  }

  private _getImageNamesAsObservables(imagesData): Observable<any>[] {
    return imagesData.map((imageData) => {
      return this.jokesService.uploadImage(imageData);
    });
  }

  private _createJoke(joke) {
    this.jokesService.createJoke(joke).subscribe(
      (createdJoke) => {
        this.createdJoke = createdJoke;
        console.log(createdJoke);
        this.jokesService.openSnackBar('Joke Created!', 'Close');
      },
      (error) => this.jokesService.openSnackBar(error, 'Close')
    );
  }
}
