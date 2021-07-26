import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../../environments/environment.prod';
import { JokeCategoryEnum } from '../enums/joke-category.enum';
import { JokeTypeEnum } from '../enums/joke-type.enum';
import { ImageModel } from '../models/image.model';
import { JokeApiModel } from '../models/joke-api.model';
import { CategoryModel, JokeModel } from '../models/joke.model';
import { FavoriteJokeService } from './favorite-joke.service';
import { JokesMapperService } from './mapper.service';

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

  public categories = new BehaviorSubject<CategoryModel[]>([]);
  private currentCategories = this.categories.asObservable();

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

  public changeCategories(categories: CategoryModel[]) {
    this.categories.next(categories);
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

  public createJoke(joke: JokeModel): Observable<any> {
    return this.http.post<any>(this.apiUrl, joke);
  }

  public updateJoke(joke: JokeModel): Observable<JokeModel[]> {
    return this.http.put<JokeApiModel>(this.apiUrl, joke).pipe(
      map((jokes: JokeApiModel) => {
        return this.jokesMapperService.mapJokeApiForJokes([jokes]);
      })
    );
  }

  public deleteJoke(id: number | string): Observable<any> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  public createCategory(title: string): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(`${this.apiUrl}/categories`, title);
  }

  public deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/categories/${id}`);
  }

  public getImageUrl(extension: string): Observable<ImageModel> {
    return this.http.post<ImageModel>(
      `https://reenbit-chuck-norris.azurewebsites.net/api/media?fileExtencion=${extension}`,
      extension
    );
  }

  public uploadImage(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'image/png',
        'x-ms-blob-type': 'BlockBlob',
      }),
    };
    return this.http
      .put<any>(data.imageData.imageUploadUrl, data.file, httpOptions)
      .pipe(map((response) => (response = data.imageData.imageName)));
  }

  public deleteJokeById(id: number | string): void {
    const jokes = this.jokes.value.filter((joke) => joke.id !== id);
    this.changeJokes(jokes);
  }

  public checkExistCategories(category: string): Observable<boolean> {
    console.log('validator');
    return this.http.get<boolean>(
      `${this.apiUrl}/categories/exists?categoryTitle=${category}`
    );
  }

  public transformCategoryStringToId(category: string) {
    let id: number | string;
    this.categories.value.map((apiCategory) =>
      apiCategory.title.toLowerCase() === category.toLowerCase()
        ? (id = apiCategory.id)
        : null
    );
    return id;
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
