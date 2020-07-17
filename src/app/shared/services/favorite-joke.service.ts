import { environment } from './../../../environments/environment.prod';
import { JokesMapperService } from './jokes-mapper.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JokeInterface } from '../interfaces/joke.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JokeApiInterface } from '../interfaces/joke-api.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteJokeService {
  private apiUrl = environment.apiUrl;

  private isFavoriteShowSubject = new BehaviorSubject<boolean>(false);
  public isFavoriteShow = this.isFavoriteShowSubject.asObservable();

  private currentFavoriteJokesSubject = new BehaviorSubject<JokeInterface[]>([]);
  public currentFavoriteJokes = this.currentFavoriteJokesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jokesMapperService: JokesMapperService,
  ) { }

  get allJokes() {
    return [...this.currentFavoriteJokesSubject.value];
  }

  public toggleDisplayFavorite(state: boolean): void {
    this.isFavoriteShowSubject.next(state);
  }

  public changeFavoriteJokes(jokes: JokeInterface[]): void {
    this.currentFavoriteJokesSubject.next(jokes);
  }

  public addJokeToFavorites(joke: JokeInterface): void {
    joke.favorite = true;
    const jokes = [...this.currentFavoriteJokesSubject.value];
    jokes.filter(j => j.id !== joke.id);
    jokes.unshift(joke);
    this.currentFavoriteJokesSubject.next(jokes);
  }

  public removeJokeFromFavorites(joke: JokeInterface): void {
    joke.favorite = false;
    const jokes = [...this.currentFavoriteJokesSubject.value];
    const index = this.allJokes.indexOf(joke);
    jokes.splice(index, 1);
    this.currentFavoriteJokesSubject.next(jokes);
  }

  public removeFavoriteJokeFromDataBase(id: number | string): Observable<number | string> {
    return this.http.delete<number | string>(`${this.apiUrl}/favorite/${id}`);
  }

  public addJokeToDataBase(id: number | string): Observable<number | string> {
    return this.http.post<number | string>(`${this.apiUrl}/favorite/${id}`, id);
  }

  public getUserFavoriteJokesFromApi(): Observable<JokeInterface[]> {
    return this.http.get<JokeApiInterface[]>(`${this.apiUrl}/user-favorite`)
      .pipe(map(
        // transform array from JokesApi interface to array of Jokes
        (data: JokeApiInterface[]) => this.jokesMapperService.mapJokeApiForJokes(data)
          // rewrite 'favorite' from 'false' to 'true'
          .map((joke: JokeInterface) => ({ ...joke, favorite: true }))
      ));
  }
}
