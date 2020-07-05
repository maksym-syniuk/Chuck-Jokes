import { IJoke } from './../interfaces/IJoke';
import { IJokeApi } from '../interfaces/IJokeApi';
import { IJokeApiArr } from '../interfaces/IJokeApiArr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JokesMapperService {

  constructor() { }

  // mapJokeApiForJokes(joke: IJokeApi): IJoke {
  //   return {
  //     categories: joke.categories,
  //     dateCreated: joke.created_at,
  //     iconUrl: joke.icon_url,
  //     id: joke.id,
  //     dateUpdated: joke.updated_at,
  //     url: joke.url,
  //     value: joke.value,
  //     favourite: false
  //   };
  // }
 
  mapJokeApiForJokes(jokes: IJokeApi | IJokeApiArr): IJoke[] {
    const jokeArr: IJoke[] = [];
    if(typeof jokes === IJokeApi){
    }
    jokes.map( (joke: IJokeApi) => {
      jokeArr.push({
            categories: joke.categories,
            dateCreated: joke.created_at,
            iconUrl: joke.icon_url,
            id: joke.id,
            dateUpdated: joke.updated_at,
            url: joke.url,
            value: joke.value,
            favourite: false
          });
    });
    return jokeArr;
  }
}

