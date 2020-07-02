import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteDisplayService {

  showFavourite: boolean;
  showFavouriteChange: Subject<boolean> = new Subject<boolean>();

  onToggleFavourite(state: boolean) {
    this.showFavouriteChange.next(state);
    this.showFavourite = state;
  }

  getFavouriteState() {
    return this.showFavourite;
  }

  constructor() { }
}
