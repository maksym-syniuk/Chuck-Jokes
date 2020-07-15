import { AuthInterface } from './../../shared/interfaces/auth.interface';
import { AuthService } from './../../shared/services/auth.service';
import { Joke } from '../../shared/interfaces/joke.interface';
import { FavoriteJokeService } from './../../shared/services/favorite-joke.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public favoriteJokes: Joke[];
  public user: AuthInterface;
  public jokesDisplayCount = 3;

  constructor(
    private favoriteJokeService: FavoriteJokeService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
    this.favoriteJokeService.currentFavoriteJokes.subscribe(jokes => this.favoriteJokes = jokes);
  }
}
