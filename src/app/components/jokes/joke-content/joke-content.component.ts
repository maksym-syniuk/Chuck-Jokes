import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-joke-content',
  templateUrl: './joke-content.component.html',
  styleUrls: ['./joke-content.component.scss']
})
export class JokeContentComponent implements OnInit {
  @Input() jokeAddedToFavourite = false;
  constructor() { }

  ngOnInit(): void {
  }

}
