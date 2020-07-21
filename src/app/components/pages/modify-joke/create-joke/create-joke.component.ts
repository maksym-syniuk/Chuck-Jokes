import { JokesService } from 'src/app/shared/services/jokes.service';
import { JokeModel } from './../../../../shared/models/joke.model';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-joke',
  templateUrl: './create-joke.component.html',
  styleUrls: ['./create-joke.component.scss'],
})
export class CreateJokeComponent implements OnInit {
  public joke = new JokeModel();
  public createdJoke: JokeModel;

  constructor(
    private jokesService: JokesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public onJokeCreate(joke: any): void {
    joke.categories = this.jokesService.transformCategoriesStringToIds(
      joke.categories
    );
    this.jokesService.createJoke(joke).subscribe(
      (createdJoke: JokeModel) => {
        this.createdJoke = createdJoke;
        this._openSnackbar('Joke Created!');
      },
      (error) => this._openSnackbar(error)
    );
  }

  private _openSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
