import { JokeModel } from './../../../shared/models/joke.model';
import { FavoriteJokeService } from './../../../shared/services/favorite-joke.service';
import { Component, OnInit } from '@angular/core';

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
  }

  private _subscribeToFavoriteJokes(): void {
    this.favoriteJokeService.currentFavoriteJokes.subscribe(
      (jokes: JokeModel[]) => (this.favoriteJokes = jokes)
    );
  }
}
