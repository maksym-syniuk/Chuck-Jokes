import { JokeCategoryEnum } from './../enums/joke-category.enum';
import { JokeTypeEnum } from './../enums/joke-type.enum';
import { FavoriteJokeService } from './favorite-joke.service';
import { JokeApi } from '../interfaces/JokeApi';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Joke } from '../interfaces/Joke';

@Injectable({
  providedIn: 'root'
})

export class JokesService {
  private jokes = new BehaviorSubject([]);
  public currentJokes = this.jokes.asObservable();

  private loadingState = new BehaviorSubject(false);
  public currentLoadingState = this.loadingState.asObservable();

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private favoriteJokesService: FavoriteJokeService,
  ) { }

  private transformFormDataToString(type: JokeTypeEnum, category: JokeCategoryEnum): string {
    switch (type) {
      case JokeTypeEnum.random:
        return `${this.apiService.getApiString()}/random`;
      case JokeTypeEnum.categories:
        return `${this.apiService.getApiString()}/random?category=${category}`;
    }
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
    return this.http.get<JokeApi[]>(`${this.apiService.getApiString()}/search?query=${searchValue}`);
  }

  public getCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.apiService.getApiString()}/categories`);
  }

  public checkIfJokeIsFavorite(joke: Joke): Joke {
    this.favoriteJokesService.allJokes.map((favoriteJoke: Joke) => {
      if (favoriteJoke.id === joke.id) {
        joke = { ...favoriteJoke };
      }
    });
    return joke;
  }
}
