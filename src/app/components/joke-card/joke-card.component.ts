import { AuthInterface } from './../../shared/interfaces/auth.interface';
import { AuthService } from './../../shared/services/auth.service';
import { JokesService } from 'src/app/shared/services/jokes.service';
import { FavoriteJokeService } from './../../shared/services/favorite-joke.service';
import { Joke } from '../../shared/interfaces/joke.interface';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joke-card',
  templateUrl: './joke-card.component.html',
  styleUrls: ['./joke-card.component.scss'],
})

export class JokeCardComponent implements OnInit {
  @Input() joke: Joke;
  @Input() favorites: boolean;
  private user: AuthInterface;
  public jokeAddedToFavorite = false;

  constructor(
    private favoriteJokeService: FavoriteJokeService,
    private jokesService: JokesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => this.user = user);
    if (!this.favorites) {
      this.joke = this.jokesService.checkIfJokeIsFavorite(this.joke);
    }
  }

  public addToFavorite() {
    if (this.user) {
      this.favoriteJokeService.onAddJokeToFavorite(this.joke);
      this.jokeAddedToFavorite = !this.jokeAddedToFavorite;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
