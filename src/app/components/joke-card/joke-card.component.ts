import { JokesService } from 'src/app/shared/services/jokes.service';
import { AuthService } from './../../shared/services/auth.service';
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
  // variable that change styles depends where jokes at (main-jokes/favorite)
  @Input() favorites: boolean;
  private isUserAuthorised: boolean;
  public errorMessage: string;
  // variable for disabling clicking heart while receiving a response
  public isWaitingForResponse = false;

  constructor(
    private favoriteJokeService: FavoriteJokeService,
    private jokesService: JokesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.favorites) {
      // change heart to filled in main-jokes if this joke is already in favorites
      this.joke = this.jokesService.checkIfJokeIsFavorite(this.joke);
    }
    this.authService.currentUser.subscribe(userData => this.isUserAuthorised = !!userData);
  }

  public addOrRemoveFavoriteJoke() {
    if (this.isUserAuthorised) {
      this.isWaitingForResponse = true;
      if (!this.joke.favorite) {
        // add joke to favorite and to data base
        this.favoriteJokeService.addJokeToDataBase(this.joke.id)
          .subscribe(
            () => {
              this.favoriteJokeService.addJokeToFavorites(this.joke);
              this.isWaitingForResponse = false;
            },
            error => {
              this.errorMessage = error;
              this.isWaitingForResponse = false;
            }
          );
      } else {
        // remove joke from favorites and form data base
        this.favoriteJokeService.removeFavoriteJokeFromDataBase(this.joke.id)
          .subscribe(
            () => {
              this.favoriteJokeService.removeJokeFromFavorites(this.joke);
              this.isWaitingForResponse = false;
            },
            error => {
              this.errorMessage = error;
              this.isWaitingForResponse = false;
            }
          );
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
