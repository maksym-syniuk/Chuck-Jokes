import { JokesService } from 'src/app/shared/services/jokes.service';
import { Joke } from './../interfaces/Joke';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteJokeService {
  private localStorageKey = 'jokes';
  private jokes: Joke[] = [];
  private favoriteJokes = new BehaviorSubject([]);
  public currentFavoriteJokes = this.favoriteJokes.asObservable();

  constructor() {
    this.favoriteJokes.next(this.getDataFromLocalStorage());
  }

  get allJokes() {
    return this.jokes;
  }

  private addJokeToFavorite(joke: Joke): void {
    this.jokes = this.jokes.filter(j => j !== joke);
    joke.favorite = true;
    this.jokes.unshift(joke);
    this.favoriteJokes.next(this.jokes);
    this.saveDataToLocalStorage(this.jokes);
  }

  private removeJokeFromFavorite(joke: Joke): void {
    joke.favorite = false;
    const index = this.jokes.indexOf(joke);
    this.jokes.splice(index, 1);
    this.favoriteJokes.next(this.jokes);
    this.saveDataToLocalStorage(this.jokes);
  }

  private getDataFromLocalStorage() {
    return this.jokes = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }

  private saveDataToLocalStorage(data: Joke[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  public onAddJokeToFavorite(joke: Joke) {
    if (joke.favorite) {
      // if joke was already added
      this.removeJokeFromFavorite(joke);
    } else {
      // if new joke
      this.addJokeToFavorite(joke);
    }
  }
}
