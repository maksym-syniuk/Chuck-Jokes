import { JokeInterface } from '../../shared/interfaces/joke.interface';
import { FavoriteJokeService } from './../../shared/services/favorite-joke.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public favoriteJokes: JokeInterface[];

  constructor(private favoriteJokeService: FavoriteJokeService) { }

  ngOnInit(): void {
    this.favoriteJokeService.currentFavoriteJokes
      .subscribe((jokes: JokeInterface[]) => this.favoriteJokes = jokes);
  }
}
