import { AuthService } from './../../../../shared/services/auth.service';
import { FavoriteJokeService } from './../../../../shared/services/favorite-joke.service';
import { JokeInterface } from './../../../../shared/interfaces/joke.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public favoriteJokes: JokeInterface[];
  public isUserAuthorised: boolean;
  public jokesDisplayCount = 3;

  constructor(
    private favoriteJokeService: FavoriteJokeService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(userData => {
      this.isUserAuthorised = !!userData;
      if (this.isUserAuthorised) {
        // get user favorite jokes when logged in
        this.favoriteJokeService.getUserFavoriteJokesFromApi()
          .subscribe(jokes => this.favoriteJokeService.changeFavoriteJokes(jokes));
      }
    });
    this.favoriteJokeService.currentFavoriteJokes.subscribe(jokes => this.favoriteJokes = jokes);
  }
}
