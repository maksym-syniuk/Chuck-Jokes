import { JokeApiModel } from '../models/joke-api.model';
import { JokeModel } from '../models/joke.model';
import { Injectable } from '@angular/core';

@Injectable()
export class JokesMapperService {
  constructor() {}

  public mapJokeApiForJokes(jokes: JokeApiModel[]): JokeModel[] {
    return jokes.map((joke: JokeApiModel) => {
      return {
        ...joke,
        favorite: false,
      };
    });
  }
}
