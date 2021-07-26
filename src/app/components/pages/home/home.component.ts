import { Component, OnInit } from '@angular/core';

import { FavoriteJokeService } from '../../../shared/services/favorite-joke.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public showFavorite: boolean;

  constructor(private favoriteJokeService: FavoriteJokeService) { }

  ngOnInit() {
    this.favoriteJokeService.isFavoriteShow.subscribe(isFavoriteShow => this.showFavorite = isFavoriteShow);
  }

  public closeBackdrop(): void {
    this.favoriteJokeService.toggleDisplayFavorite(false);
  }
}
