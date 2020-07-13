import { HttpErrorResponse } from '@angular/common/http';
import { JokeApi } from 'src/app/shared/interfaces/JokeApi';
import { JokeTypeEnum } from './../../shared/enums/joke-type.enum';
import { JokesMapperService } from 'src/app/shared/services/jokes-mapper.service';
import { Joke } from '../../shared/interfaces/Joke';
import { Subscription } from 'rxjs';
import { JokesService } from '../../shared/services/jokes.service';
import { FavouriteDisplayService } from './../../shared/services/favourite-display.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})

export class JokesComponent implements OnInit, OnDestroy {
  @Input() showSidebar: boolean;
  public jokes: Joke[];
  public loading: boolean;
  public errorMessage: string;
  private jokesSubscription: Subscription = new Subscription();

  constructor(
    private favouriteDisplayService: FavouriteDisplayService,
    private jokesService: JokesService,
    private jokesMapperService: JokesMapperService
  ) { }

  private getRandomJoke(): void {
    this.jokesService.getJoke(JokeTypeEnum.random).subscribe((joke: JokeApi) => {
      this.jokes = this.jokesMapperService.mapJokeApiForJokes([joke]);
    });
  }

  ngOnInit() {
    this.jokesService.currentLoadingState.subscribe(state => this.loading = state);
    this.jokesService.currentJokes.subscribe(jokes => this.jokes = jokes);
    this.jokesService.currentErrorMessage.subscribe(message => this.errorMessage = message);
    this.getRandomJoke();
  }

  public onToggleSidebar() {
    this.showSidebar = !this.showSidebar;
    this.favouriteDisplayService.onToggleFavourite(this.showSidebar);
  }

  ngOnDestroy() {
    this.jokesSubscription.unsubscribe();
  }
}
