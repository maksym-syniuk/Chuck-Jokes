import { FavouriteDisplayService } from './../../services/favourite-display.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent implements OnInit {
  showSidebar = false;

  constructor(private favouriteDisplayService: FavouriteDisplayService) { }

  ngOnInit(): void {
  }

  onToggleSidebar() {
    this.showSidebar = !this.showSidebar;
    this.favouriteDisplayService.onToggleFavourite(this.showSidebar);
  }
}
