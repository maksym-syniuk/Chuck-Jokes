import { Joke } from './../../shared/interfaces/Joke';
import { FavoriteJokeService } from './../../shared/services/favorite-joke.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteJokes: Joke[];
  constructor(private favoriteJokeService: FavoriteJokeService) { }

  ngOnInit(): void {
    this.favoriteJokeService.currentFavoriteJokes.subscribe(
      (jokes: Joke[]) => {
        this.favoriteJokes = jokes;
      }
    );
  }
}
