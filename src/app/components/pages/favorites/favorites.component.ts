import { Component, OnInit } from '@angular/core';

import { JokeModel } from '../../../shared/models/joke.model';
import { FavoriteJokeService } from '../../../shared/services/favorite-joke.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  public favoriteJokes: JokeModel[];

  constructor(private favoriteJokeService: FavoriteJokeService) {}

  ngOnInit(): void {
    this._subscribeToFavoriteJokes();
    this._getFavoriteJokesFromApi();
  }

  private _subscribeToFavoriteJokes(): void {
    this.favoriteJokeService.currentFavoriteJokes.subscribe(
      (jokes: JokeModel[]) => (this.favoriteJokes = jokes)
    );
  }

  private _getFavoriteJokesFromApi(): void {
    this.favoriteJokeService
      .getUserFavoriteJokesFromApi()
      .subscribe((jokes: JokeModel[]) =>
        this.favoriteJokeService.changeFavoriteJokes(jokes)
      );
  }
}
