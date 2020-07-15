import { User } from './../../shared/models/user.model';
import { AuthService } from './../../shared/services/auth.service';
import { JokeApi } from 'src/app/shared/interfaces/jokeApi.interface';
import { JokeTypeEnum } from './../../shared/enums/joke-type.enum';
import { JokesMapperService } from 'src/app/shared/services/jokes-mapper.service';
import { Joke } from '../../shared/interfaces/joke.interface';
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
  public user: User;
  private jokesSubscription: Subscription = new Subscription();

  constructor(
    private favouriteDisplayService: FavouriteDisplayService,
    private jokesService: JokesService,
    private jokesMapperService: JokesMapperService,
    private authService: AuthService
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
    this.authService.currentUser.subscribe(user => this.user = user.user);
    this.getRandomJoke();
  }

  public onToggleSidebar() {
    this.showSidebar = !this.showSidebar;
    this.favouriteDisplayService.onToggleFavourite(this.showSidebar);
  }

  public logout() {
    this.authService.logout();
    // location.reload();
  }

  ngOnDestroy() {
    this.jokesSubscription.unsubscribe();
  }
}
