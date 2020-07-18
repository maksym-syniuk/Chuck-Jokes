import { JokesMapperService } from './jokes-mapper.service';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment.prod';
import { JokeCategoryEnum } from './../enums/joke-category.enum';
import { JokeTypeEnum } from './../enums/joke-type.enum';
import { FavoriteJokeService } from './favorite-joke.service';
import { JokeApiInterface } from '../interfaces/joke-api.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JokeInterface, CategoryInterface } from '../interfaces/joke.interface';

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

  public changeError(error: string) {
    this.errorMessage.next(error);
  }

  public changeJokes(jokes: JokeInterface[]) {
    this.jokes.next(jokes);
  }

  public changeLoadingState(state: boolean) {
    this.loadingState.next(state);
  }

  public getJoke(type: JokeTypeEnum, category: JokeCategoryEnum = null): Observable<JokeInterface[]> {
    return this.http.get<JokeApiInterface>(this.transformFormDataToString(type, category))
      .pipe(map(
        (joke: JokeApiInterface) => {
          return this.jokesMapperService.mapJokeApiForJokes([joke]);
        }));
  }

  public getTopJokes(type: JokeTypeEnum): Observable<JokeInterface[]> {
    return this.http.get<JokeApiInterface[]>(this.transformFormDataToString(type))
      .pipe(
        map((jokes: JokeApiInterface[]) => {
          return this.jokesMapperService.mapJokeApiForJokes(jokes);
        }));
  }

  public searchJokes(searchValue: string): Observable<JokeInterface[]> {
    return this.http.get<JokeApiInterface[]>(`${this.apiUrl}/search?query=${searchValue}`)
      .pipe(
        map((jokes: JokeApiInterface[]) => {
          return this.jokesMapperService.mapJokeApiForJokes(jokes);
        }));
  }

  public getCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(`${this.apiUrl}/categories`);
  }

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

  public checkIfJokeIsFavorite(joke: JokeInterface): JokeInterface {
    this.favoriteJokesService.allJokes.map((favoriteJoke: JokeInterface) => {
      return favoriteJoke.id === joke.id ? joke = { ...favoriteJoke } : joke;
    });
    return joke;
  }

  public createJoke(joke: JokeInterface): Observable<any> {
    return this.http.post<JokeInterface>(this.apiUrl, joke);
  }
}
