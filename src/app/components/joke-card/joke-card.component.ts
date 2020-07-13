import { JokesService } from 'src/app/shared/services/jokes.service';
import { FavoriteJokeService } from './../../shared/services/favorite-joke.service';
import { Joke } from '../../shared/interfaces/Joke';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-joke-card',
  templateUrl: './joke-card.component.html',
  styleUrls: ['./joke-card.component.scss']
})
export class JokeCardComponent implements OnInit {
  @Input() joke: Joke;
  @Input() favorites: boolean;
  jokeAddedToFavorite = false;
  constructor(
    private favoriteJokeService: FavoriteJokeService,
    private jokesService: JokesService
  ) { }

  ngOnInit(): void {
    if (!this.favorites) {
      this.joke = this.jokesService.checkIfJokeIsFavorite(this.joke);
    }
  }

  addToFavorite() {
    this.favoriteJokeService.onAddJokeToFavorite(this.joke);
    this.jokeAddedToFavorite = !this.jokeAddedToFavorite;
  }
}
