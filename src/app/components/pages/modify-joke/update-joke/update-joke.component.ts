import { JokeModel } from './../../../../shared/models/joke.model';
import { ActivatedRoute, Params } from '@angular/router';
import { JokesService } from './../../../../shared/services/jokes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-joke',
  templateUrl: './update-joke.component.html',
  styleUrls: ['./update-joke.component.scss'],
})
export class UpdateJokeComponent implements OnInit {
  private id: number;
  public joke = new JokeModel();
  public updatedJoke: JokeModel[];

  constructor(
    private route: ActivatedRoute,
    private jokesService: JokesService
  ) {}

  ngOnInit(): void {
    this._getJokeByIdFromRoute(this.route);
  }

  private _getJokeByIdFromRoute(route: ActivatedRoute): void {
    route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.jokesService
        .getJokeById(this.id)
        .subscribe((joke: JokeModel) => (this.joke = joke));
    });
  }

  public onJokeUpdate(joke: any): void {
    joke.categories = this.jokesService.transformCategoriesStringToIds(
      joke.categories
    );
    this.jokesService.updateJoke(joke).subscribe(
      (updatedJoke: JokeModel[]) => {
        this.updatedJoke = updatedJoke;
        this.jokesService.openSnackBar('Joke was updated!', 'Close');
      },
      (error) => this.jokesService.openSnackBar(error, 'Close')
    );
  }
}
