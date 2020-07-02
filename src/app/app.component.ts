import { FavouriteDisplayService } from './services/favourite-display.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  showFavourite: boolean;
  subscription: Subscription = new Subscription();

  constructor(private favouriteDisplayService: FavouriteDisplayService) {
    this.subscription = this.favouriteDisplayService.showFavouriteChange.subscribe(value => {
      this.showFavourite = value;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
