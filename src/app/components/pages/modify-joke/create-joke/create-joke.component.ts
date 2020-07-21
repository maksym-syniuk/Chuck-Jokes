import { JokesService } from 'src/app/shared/services/jokes.service';
import { JokeModel } from './../../../../shared/models/joke.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-joke',
  templateUrl: './create-joke.component.html',
  styleUrls: ['./create-joke.component.scss'],
})
export class CreateJokeComponent implements OnInit {
  public joke = new JokeModel();
  public createdJoke: JokeModel;

  constructor(private jokesService: JokesService) {}

  ngOnInit(): void {}

  public onJokeCreate(joke: any): void {
    joke.categories = this.jokesService.transformCategoriesStringToIds(
      joke.categories
    );
    this.jokesService
      .createJoke(joke)
      .subscribe((createdJoke: JokeModel) => (this.createdJoke = createdJoke));
  }
}
