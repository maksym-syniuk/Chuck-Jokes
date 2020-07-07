import { Joke } from '../../shared/interfaces/Joke';
import { Subscription } from 'rxjs';
import { JokesService } from '../../shared/services/jokes.service';
import { FavouriteDisplayService } from './../../shared/services/favourite-display.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})

export class JokesComponent implements OnInit, OnDestroy {
  public jokes: Joke[] = [];
  public showSidebar = false;

  private jokesSubscription: Subscription = new Subscription();

  constructor(
    private favouriteDisplayService: FavouriteDisplayService,
    private jokesService: JokesService,
  ) { }

  ngOnInit() {
    this.jokes = this.jokesService.getJokesArr();
  }

  onToggleSidebar() {
    this.showSidebar = !this.showSidebar;
    this.favouriteDisplayService.onToggleFavourite(this.showSidebar);
  }

  ngOnDestroy() {
    this.jokesSubscription.unsubscribe();
  }
}
