import { JokeModel } from './../models/joke.model';
import { JokeApiModel } from './../models/joke-api.model';
import { environment } from './../../../environments/environment.prod';
import { JokesMapperService } from './jokes-mapper.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteJokeService {
  private apiUrl = environment.apiUrl;

  private isFavoriteShowSubject = new BehaviorSubject<boolean>(false);
  public isFavoriteShow = this.isFavoriteShowSubject.asObservable();

  private currentFavoriteJokesSubject = new BehaviorSubject<JokeModel[]>([]);
  public currentFavoriteJokes = this.currentFavoriteJokesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jokesMapperService: JokesMapperService
  ) {}

  get allJokes() {
    return [...this.currentFavoriteJokesSubject.value];
  }

  public toggleDisplayFavorite(state: boolean): void {
    this.isFavoriteShowSubject.next(state);
  }

  public changeFavoriteJokes(jokes: JokeModel[]): void {
    this.currentFavoriteJokesSubject.next(jokes);
  }

  public addJokeToFavorites(joke: JokeModel): void {
    joke.favorite = true;
    const jokes = [...this.currentFavoriteJokesSubject.value];
    jokes.filter((j) => j.id !== joke.id);
    jokes.unshift(joke);
    this.currentFavoriteJokesSubject.next(jokes);
  }

  public removeJokeFromFavorites(joke: JokeModel): void {
    joke.favorite = false;
    const jokes = [...this.currentFavoriteJokesSubject.value];
    const index = this.allJokes.indexOf(joke);
    jokes.splice(index, 1);
    this.currentFavoriteJokesSubject.next(jokes);
  }

  public removeFavoriteJokeFromDataBase(
    id: number | string
  ): Observable<number | string> {
    return this.http.delete<number | string>(`${this.apiUrl}/favorite/${id}`);
  }

  public addJokeToDataBase(id: number | string): Observable<number | string> {
    return this.http.post<number | string>(`${this.apiUrl}/favorite/${id}`, id);
  }

  public getUserFavoriteJokesFromApi(): Observable<JokeModel[]> {
    return this.http.get<JokeApiModel[]>(`${this.apiUrl}/user-favorite`).pipe(
      map(
        // transform array from JokesApi interface to array of Jokes
        (data: JokeApiModel[]) =>
          this.jokesMapperService
            .mapJokeApiForJokes(data)
            // rewrite 'favorite' from 'false' to 'true'
            .map((joke: JokeModel) => ({ ...joke, favorite: true }))
      )
    );
  }
}
