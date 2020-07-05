import { IJokeApi } from './../interfaces/IJokeApi';
import { ApiService } from './api.service';
import { FormMapperService } from './form-mapper.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IJoke } from '../interfaces/IJoke';

@Injectable({
  providedIn: 'root'
})

export class JokesService {
  private jokes: IJoke[] = [];

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private formMapperService: FormMapperService
  ) { }

  setJokes(jokesArr: IJoke[]): void {
    this.jokes = [...jokesArr];
  }

  get jokesArr(): IJoke[]{
    return this.jokes;
  }

  getJokes(form: FormGroup): Observable<IJokeApi[]> {
    return this.http.get<IJokeApi[]>(this.formMapperService.mapFormDataForApiResponse(form));
  }

  getCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.apiService.getApiString()}/categories`);
  }
}
