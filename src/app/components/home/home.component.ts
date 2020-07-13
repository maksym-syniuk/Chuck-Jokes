import { FavouriteDisplayService } from './../../shared/services/favourite-display.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  showFavourite: boolean;
  subscription: Subscription = new Subscription();

  constructor(private favouriteDisplayService: FavouriteDisplayService) {
    this.subscription = this.favouriteDisplayService.showFavouriteChange.subscribe(value => {
      this.showFavourite = value;
    });
  }
  public closeBackdrop(): void {
    this.favouriteDisplayService.onToggleFavourite(false);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
