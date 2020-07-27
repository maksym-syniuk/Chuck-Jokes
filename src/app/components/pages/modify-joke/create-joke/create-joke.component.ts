import { JokesService } from 'src/app/shared/services/jokes.service';
import { JokeModel } from './../../../../shared/models/joke.model';
import { Component } from '@angular/core';

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
    joke.categories = joke.categories.map((category) =>
      this.jokesService.transformCategoryStringToId(category)
    );
    this.jokesService.createJoke(joke).subscribe(
      (createdJoke: JokeModel) => {
        this.createdJoke = createdJoke;
        this.jokesService.openSnackBar('Joke Created!', 'Close');
      },
      (error) => this.jokesService.openSnackBar(error, 'Close')
    );
  }
}
