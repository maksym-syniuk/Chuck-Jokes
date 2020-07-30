import { Injectable } from '@angular/core';

import { JokeApiModel } from '../models/joke-api.model';
import { JokeModel } from '../models/joke.model';

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
