import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JokeApiModel } from './../models/joke-api.model';
import { JokeModel, CategoryModel } from './../models/joke.model';
import { JokeFormMode } from './../enums/joke-form-mode.enum';
import { JokesMapperService } from './jokes-mapper.service';
import { environment } from './../../../environments/environment.prod';
import { JokeCategoryEnum } from './../enums/joke-category.enum';
import { JokeTypeEnum } from './../enums/joke-type.enum';
import { FavoriteJokeService } from './favorite-joke.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
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
    private jokesMapperService: JokesMapperService,
    private snackBar: MatSnackBar
  ) {}

  public changeError(error: string) {
    this.errorMessage.next(error);
  }

  public changeJokes(jokes: JokeModel[]) {
    this.jokes.next(jokes);
  }

  public changeLoadingState(state: boolean) {
    this.loadingState.next(state);
  }

  public getJoke(
    type: JokeTypeEnum,
    category: JokeCategoryEnum = null
  ): Observable<JokeModel[]> {
    return this.http
      .get<JokeApiModel>(this.transformFormDataToString(type, category))
      .pipe(
        map((joke: JokeApiModel) => {
          return this.jokesMapperService.mapJokeApiForJokes([joke]);
        })
      );
  }

  public getTopJokes(type: JokeTypeEnum): Observable<JokeModel[]> {
    return this.http
      .get<JokeApiModel[]>(this.transformFormDataToString(type))
      .pipe(
        map((jokes: JokeApiModel[]) => {
          return this.jokesMapperService.mapJokeApiForJokes(jokes);
        })
      );
  }

  public searchJokes(searchValue: string): Observable<JokeModel[]> {
    return this.http
      .get<JokeApiModel[]>(`${this.apiUrl}/search?query=${searchValue}`)
      .pipe(
        map((jokes: JokeApiModel[]) => {
          return this.jokesMapperService.mapJokeApiForJokes(jokes);
        })
      );
  }

  public getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${this.apiUrl}/categories`);
  }

  private transformFormDataToString(
    type: JokeTypeEnum,
    category?: JokeCategoryEnum
  ): string {
    switch (type) {
      case JokeTypeEnum.random:
        return `${this.apiUrl}/random`;
      case JokeTypeEnum.top:
        return `${this.apiUrl}/favorite/top`;
      case JokeTypeEnum.categories:
        return `${this.apiUrl}/random?category=${category}`;
    }
  }

  public checkIfJokeIsFavorite(joke: JokeModel): JokeModel {
    this.favoriteJokesService.allJokes.map((favoriteJoke: JokeModel) => {
      return favoriteJoke.id === joke.id ? (joke = { ...favoriteJoke }) : joke;
    });
    return joke;
  }

  public getJokeById(id: number): Observable<JokeModel> {
    return this.http.get<JokeModel>(`${this.apiUrl}/${id}`);
  }

  public createJoke(joke: JokeModel): Observable<JokeModel> {
    return this.http.post<JokeModel>(this.apiUrl, joke);
  }

  public updateJoke(joke: JokeModel): Observable<JokeModel[]> {
    return this.http.put<JokeApiModel>(this.apiUrl, joke).pipe(
      map((jokes: JokeApiModel) => {
        return this.jokesMapperService.mapJokeApiForJokes([jokes]);
      })
    );
  }

  public deleteJoke(id: number | string): Observable<any> {
    return this.http.delete<number | string>(`${this.apiUrl}/${id}`);
  }

  public deleteJokeById(id: number | string): void {
    const jokes = this.jokes.value.filter((joke) => joke.id !== id);
    this.changeJokes(jokes);
  }

  public transformCategoriesStringToIds(
    categories: string[]
  ): number[] | string[] {
    const ids = [];
    this.getCategories().subscribe((apiCategories: CategoryModel[]) => {
      categories.map((category) => {
        apiCategories.map((ctg) => {
          if (category === ctg.title) {
            ids.push(ctg.id);
          }
        });
      });
    });
    return ids;
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
