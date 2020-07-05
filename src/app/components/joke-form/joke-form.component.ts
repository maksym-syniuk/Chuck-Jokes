import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JokesService } from 'src/app/shared/services/jokes.service';
import { Subscription } from 'rxjs';
import { JokesMapperService } from 'src/app/shared/services/jokes-mapper.service';
import { IJokeApi } from 'src/app/shared/interfaces/IJokeApi';

@Component({
  selector: 'app-joke-form',
  templateUrl: './joke-form.component.html',
  styleUrls: ['./joke-form.component.scss']
})
export class JokeFormComponent implements OnInit, OnDestroy {
  public jokeForm: FormGroup;
  public categories: string[] = [];
  private categoriesSubscription: Subscription = new Subscription();

  constructor(
    private jokesService: JokesService,
    private jokesMapperService: JokesMapperService,
  ) { }

  ngOnInit(): void {
    this.jokeForm = new FormGroup({
      jokeControl: new FormControl('random'),
      jokeCategoryGroup: new FormGroup({
        category: new FormControl(null)
      }),
      jokeSearchGroup: new FormGroup({
        search: new FormControl('', [Validators.min(1)])
      })
    });

    this.categoriesSubscription = this.jokesService.getCategories()
    .subscribe(
      (categoriesArr: string[]) => {
        this.categories = [...categoriesArr];
      });
  }

  onSubmitForm(): void {
    this.jokesService.getJokes(this.jokeForm)
    .subscribe(
          (jokes: IJokeApi[]) => {
            this.jokesService.setJokes(this.jokesMapperService.mapJokeApiForJokes(jokes));
          });
  }

  ngOnDestroy(): void{
    this.categoriesSubscription.unsubscribe();
  }
}
