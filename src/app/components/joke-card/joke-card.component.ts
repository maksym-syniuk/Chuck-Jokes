import { Role } from 'src/app/shared/models/user.model';
import { JokesService } from 'src/app/shared/services/jokes.service';

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthInterface } from '../../shared/interfaces/auth.interface';
import { JokeModel } from '../../shared/models/joke.model';
import { AuthService } from '../../shared/services/auth.service';
import { FavoriteJokeService } from '../../shared/services/favorite-joke.service';

@Component({
  selector: 'app-joke-card',
  templateUrl: './joke-card.component.html',
  styleUrls: ['./joke-card.component.scss'],
})
export class JokeCardComponent implements OnInit {
  @Input() joke: JokeModel;
  // variable that change styles depends where jokes at (main-jokes/favorite)
  @Input() isFavorites: boolean;
  public userData: AuthInterface;
  public isSuperAdmin: boolean;
  public errorMessage: string;
  // variable for disabling clicking heart while receiving a response
  public isWaitingForResponse = false;

  constructor(
    private favoriteJokeService: FavoriteJokeService,
    private jokesService: JokesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.isFavorites) {
      // change heart to filled in main-jokes if this joke is already in favorites
      this.joke = this.jokesService.checkIfJokeIsFavorite(this.joke);
    }
    this._subscribeToGetUserData();
  }

  private _subscribeToGetUserData(): void {
    this.authService.currentUser.subscribe((userData: AuthInterface) => {
      this.userData = userData;
      if (userData) {
        this.isSuperAdmin = userData.user.roles.includes(Role.SUPERADMIN);
      }
    });
  }

  public onDeleteIconClick(): void {
    this.jokesService.deleteJoke(this.joke.id).subscribe(
      () => {
        this._deleteJokeFromServices(this.joke);
        this.jokesService.openSnackBar('Joke deleted!', 'Close');
      },
      (error) => this.jokesService.openSnackBar(error, 'Close')
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

  public goToJokePage(): void {
    this.router.navigate(['joke', this.joke.id]);
  }

  public onHeartIconClick() {
    if (this.userData) {
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
        this.jokesService.openSnackBar('Joke added to Favorites!', 'Close');
      },
      (error) => {
        this.errorMessage = error;
        this.isWaitingForResponse = false;
        this.jokesService.openSnackBar(error, 'Close');
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
          this.jokesService.openSnackBar(
            'Joke removed from Favorites!',
            'Close'
          );
        },
        (error) => {
          this.errorMessage = error;
          this.isWaitingForResponse = false;
        }
      );
  }
}
