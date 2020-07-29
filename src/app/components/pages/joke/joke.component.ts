import { JokeModel } from './../../../shared/models/joke.model';
import { JokesService } from 'src/app/shared/services/jokes.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss'],
})
export class JokeComponent implements OnInit {
  private id: number;
  public isLoading: boolean;
  public joke: JokeModel;

  constructor(
    private route: ActivatedRoute,
    private jokesService: JokesService
  ) {}

  ngOnInit(): void {
    this._getJokeByIdFromRoute(this.route);
  }

  private _getJokeByIdFromRoute(route: ActivatedRoute): void {
    this.isLoading = true;
    route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.jokesService.getJokeById(this.id).subscribe((joke: JokeModel) => {
        this.joke = joke;
        console.log(joke);
        this.isLoading = false;
      });
    });
  }
}
