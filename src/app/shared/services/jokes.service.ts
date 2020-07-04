import { IJokeApi } from './../interfaces/IJokeApi';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class JokesService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  getJokes(params: string = 'random'): Observable<IJokeApi> {
    return this.http.get<IJokeApi>(`${this.apiService.getApiString()}/${params}`);
  }

  getCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.apiService.getApiString()}/categories`);
  }
}
