import { Joke } from './../../shared/interfaces/Joke';
import { FavoriteJokeService } from './../../shared/services/favorite-joke.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public favoriteJokes: Joke[];
  constructor(private favoriteJokeService: FavoriteJokeService) { }

  ngOnInit(): void {
    this.favoriteJokeService.currentFavoriteJokes.subscribe(jokes => this.favoriteJokes = jokes);
  }

}
