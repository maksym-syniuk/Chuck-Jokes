import { JokeModel } from './../../shared/models/joke.model';
import { JokesService } from 'src/app/shared/services/jokes.service';
import { AuthService } from './../../shared/services/auth.service';
import { FavoriteJokeService } from './../../shared/services/favorite-joke.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-joke-card',
  templateUrl: './joke-card.component.html',
  styleUrls: ['./joke-card.component.scss'],
})
export class JokeCardComponent implements OnInit {
  @Input() joke: JokeModel;
  // variable that change styles depends where jokes at (main-jokes/favorite)
  @Input() isFavorites: boolean;

  public isUserAuthorised: boolean;
  public errorMessage: string;
  // variable for disabling clicking heart while receiving a response
  public isWaitingForResponse = false;

  constructor(
    private favoriteJokeService: FavoriteJokeService,
    private jokesService: JokesService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.joke);
    if (!this.isFavorites) {
      // change heart to filled in main-jokes if this joke is already in favorites
      this.joke = this.jokesService.checkIfJokeIsFavorite(this.joke);
    }
    this.authService.currentUser.subscribe(
      (userData) => (this.isUserAuthorised = !!userData)
    );
  }

  public onDeleteIconClick(): void {
    this.jokesService.deleteJoke(this.joke.id).subscribe(
      () => {
        this._deleteJokeFromServices(this.joke);
        this._openSnackBar('Joke deleted!');
      },
      (error) => this._openSnackBar(error)
    );
  }

  private _deleteJokeFromServices(joke: JokeModel): void {
    if (joke.favorite) {
      this.jokesService.deleteJokeById(joke.id);
      this.favoriteJokeService.deleteFavoriteJokeById(joke.id);
    } else {
      this.jokesService.deleteJokeById(joke.id);
    }
  }

  public goToEditPage(): void {
    this.router.navigate(['update-joke', this.joke.id]);
  }

  public onHeartIconClick() {
    if (this.isUserAuthorised) {
      this.isWaitingForResponse = true;
      this.joke.favorite
        ? this.removeJokeFromFavorite()
        : this.addJokeToFavorite();
    } else {
      this.router.navigate(['/login']);
    }
  }

  private addJokeToFavorite(): void {
    this.favoriteJokeService.addJokeToDataBase(this.joke.id).subscribe(
      () => {
        this.favoriteJokeService.addJokeToFavorites(this.joke);
        this.isWaitingForResponse = false;
        this._openSnackBar('Joke added to Favorites!');
      },
      (error) => {
        this.errorMessage = error;
        this.isWaitingForResponse = false;
        this._openSnackBar(error);
      }
    );
  }

  private removeJokeFromFavorite(): void {
    this.favoriteJokeService
      .removeFavoriteJokeFromDataBase(this.joke.id)
      .subscribe(
        () => {
          this.favoriteJokeService.removeJokeFromFavorites(this.joke);
          this.isWaitingForResponse = false;
          this._openSnackBar('Joke removed from Favorites!');
        },
        (error) => {
          this.errorMessage = error;
          this.isWaitingForResponse = false;
          this._openSnackBar(error);
        }
      );
  }

  private _openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
