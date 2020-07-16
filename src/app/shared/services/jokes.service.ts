import { environment } from './../../../environments/environment.prod';
import { JokeCategoryEnum } from './../enums/joke-category.enum';
import { JokeTypeEnum } from './../enums/joke-type.enum';
import { FavoriteJokeService } from './favorite-joke.service';
import { JokeApi } from '../interfaces/jokeApi.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Joke } from '../interfaces/joke.interface';

@Injectable({
  providedIn: 'root'
})

export class JokesService {
  private apiUrl = environment.apiUrl;

  private jokes = new BehaviorSubject([]);
  public currentJokes = this.jokes.asObservable();

  private loadingState = new BehaviorSubject(false);
  public currentLoadingState = this.loadingState.asObservable();

  private errorMessage = new BehaviorSubject('');
  public currentErrorMessage = this.errorMessage.asObservable();

  constructor(
    private http: HttpClient,
    private favoriteJokesService: FavoriteJokeService,
  ) { }

  private transformFormDataToString(type: JokeTypeEnum, category: JokeCategoryEnum): string {
    switch (type) {
      case JokeTypeEnum.random:
        return `${this.apiUrl}/random`;
      case JokeTypeEnum.categories:
        return `${this.apiUrl}/random?category=${category}`;
    }
  }

  public changeError(error: string) {
    this.errorMessage.next(error);
  }

  public changeJokes(jokes: Joke[]) {
    this.jokes.next(jokes);
  }

  public changeLoadingState(state: boolean) {
    this.loadingState.next(state);
  }

  public getJoke(type: JokeTypeEnum, category: JokeCategoryEnum = null): Observable<JokeApi> {
    return this.http.get<JokeApi>(this.transformFormDataToString(type, category));
  }

  public searchJokes(searchValue: string): Observable<JokeApi[]> {
    return this.http.get<JokeApi[]>(`${this.apiUrl}/search?query=${searchValue}`);
  }

  public getCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.apiUrl}/categories`);
  }

  public checkIfJokeIsFavorite(joke: Joke): Joke {
    this.favoriteJokesService.allJokes.map((favoriteJoke: Joke) => {
      return favoriteJoke.id === joke.id ? joke = { ...favoriteJoke } : joke;
    }
    );
    return joke;
  }
}
