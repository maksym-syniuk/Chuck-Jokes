import { JokeApi } from '../interfaces/JokeApi';
import { ApiService } from './api.service';
import { FormMapperService } from './form-mapper.service';
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

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private formMapperService: FormMapperService
  ) { }

  changeJokes(jokes: Joke[]) {
    this.jokes.next(jokes);
  }

  getJoke(value: object): Observable<JokeApi> {
    return this.http.get<JokeApi>(this.formMapperService.transformFormDataToString(value));
  }

  searchJokes(value: object): Observable<JokeApi[]> {
    return this.http.get<JokeApi[]>(this.formMapperService.transformFormDataToString(value));
  }

  getCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.apiService.getApiString()}/categories`);
  }
}
