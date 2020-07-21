import { JokeModel } from './../../../../shared/models/joke.model';
import { JokeTypeEnum } from './../../../../shared/enums/joke-type.enum';
import { AuthService } from './../../../../shared/services/auth.service';
import { JokesService } from './../../../../shared/services/jokes.service';
import { FavoriteJokeService } from './../../../../shared/services/favorite-joke.service';
import { UserModel } from './../../../../shared/models/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss'],
})
export class JokesComponent implements OnInit {
  @Input() showSidebar: boolean;
  public jokes: JokeModel[];
  public isLoading: boolean;
  public errorMessage: string;
  public userData: UserModel;

  constructor(
    private favoriteJokeService: FavoriteJokeService,
    private jokesService: JokesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.jokesService.currentLoadingState.subscribe(
      (state) => (this.isLoading = state)
    );
    this.jokesService.currentJokes.subscribe((jokes) => (this.jokes = jokes));
    this.jokesService.currentErrorMessage.subscribe(
      (message) => (this.errorMessage = message)
    );
    this.authService.currentUser.subscribe(
      (authData) => (this.userData = authData && authData.user)
    );
    this.getRandomJoke();
  }

  private getRandomJoke(): void {
    this.jokesService
      .getJoke(JokeTypeEnum.random)
      .subscribe((joke: JokeModel[]) => (this.jokes = joke));
  }

  public onToggleSidebar() {
    this.showSidebar = !this.showSidebar;
    this.favoriteJokeService.toggleDisplayFavorite(this.showSidebar);
  }

  public logout() {
    this.authService.logout();
  }
}
