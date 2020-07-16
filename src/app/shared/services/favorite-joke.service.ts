import { environment } from './../../../environments/environment.prod';
import { JokesMapperService } from './jokes-mapper.service';
import { map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Joke } from '../interfaces/joke.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JokeApi } from '../interfaces/jokeApi.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteJokeService {
  private apiUrl = environment.apiUrl;
  private currentFavoriteJokesSubject = new BehaviorSubject<Joke[]>([]);
  public currentFavoriteJokes = this.currentFavoriteJokesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jokesMapperService: JokesMapperService,
  ) { }

  get allJokes() {
    return [...this.currentFavoriteJokesSubject.value];
  }

  public changeFavoriteJokes(jokes: Joke[]): void {
    this.currentFavoriteJokesSubject.next(jokes);
  }

  public addJokeToFavorites(joke: Joke): void {
    joke.favorite = true;
    const jokes = [...this.currentFavoriteJokesSubject.value];
    jokes.filter(j => j.id !== joke.id);
    jokes.unshift(joke);
    this.currentFavoriteJokesSubject.next(jokes);
  }

  public removeJokeFromFavorites(joke: Joke): void {
    joke.favorite = false;
    const jokes = [...this.currentFavoriteJokesSubject.value];
    const index = this.allJokes.indexOf(joke);
    jokes.splice(index, 1);
    this.currentFavoriteJokesSubject.next(jokes);
  }

  public removeFavoriteJokeFromDataBase(id: number | string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/favorite/${id}`)
      .pipe(delay(3000));
  }

  public addJokeToDataBase(id: number | string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/favorite/${id}`, id)
      .pipe(delay(3000));
  }

  public getUserFavoriteJokesFromApi(): Observable<Joke[]> {
    return this.http.get<JokeApi[]>(`${this.apiUrl}/user-favorite`)
      .pipe(map(
        // transform array from JokesApi interface to array of Jokes
        (data: JokeApi[]) => this.jokesMapperService.mapJokeApiForJokes(data)
          // rewrite 'favorite' from 'false' to 'true'
          .map((joke: Joke) => ({ ...joke, favorite: true }))
      ));
  }
}
