import { JokesMapperService } from './jokes-mapper.service';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment.prod';
import { JokeCategoryEnum } from './../enums/joke-category.enum';
import { JokeTypeEnum } from './../enums/joke-type.enum';
import { FavoriteJokeService } from './favorite-joke.service';
import { JokeApi } from '../interfaces/jokeApi.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Joke, CategoryInterface } from '../interfaces/joke.interface';

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
    private jokesMapperService: JokesMapperService
  ) { }

  private transformFormDataToString(type: JokeTypeEnum, category?: JokeCategoryEnum): string {
    switch (type) {
      case JokeTypeEnum.random:
        return `${this.apiUrl}/random`;
      case JokeTypeEnum.top:
        return `${this.apiUrl}/favorite/top`;
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

  public getJoke(type: JokeTypeEnum, category: JokeCategoryEnum = null): Observable<Joke[]> {
    return this.http.get<JokeApi>(this.transformFormDataToString(type, category))
      .pipe(map(
        (joke: JokeApi) => {
          return this.jokesMapperService.mapJokeApiForJokes([joke]);
        }));
  }

  public getTopJokes(type: JokeTypeEnum): Observable<Joke[]> {
    return this.http.get<JokeApi[]>(this.transformFormDataToString(type))
      .pipe(
        map((jokes: JokeApi[]) => {
          return this.jokesMapperService.mapJokeApiForJokes(jokes);
        }));
  }

  public searchJokes(searchValue: string): Observable<Joke[]> {
    return this.http.get<JokeApi[]>(`${this.apiUrl}/search?query=${searchValue}`)
      .pipe(
        map((jokes: JokeApi[]) => {
          return this.jokesMapperService.mapJokeApiForJokes(jokes);
        }));
  }

  public getCategories(): Observable<Array<string>> {
    return this.http.get<CategoryInterface[]>(`${this.apiUrl}/categories`)
      .pipe(
        map((categories: CategoryInterface[]) => {
          const arr = [];
          categories.map((category: CategoryInterface) => arr.push(category.title));
          return arr;
        }));
  }

  public checkIfJokeIsFavorite(joke: Joke): Joke {
    this.favoriteJokesService.allJokes.map((favoriteJoke: Joke) => {
      return favoriteJoke.id === joke.id ? joke = { ...favoriteJoke } : joke;
    }
    );
    return joke;
  }
}
