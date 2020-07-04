import { JokesMapperService } from './../../shared/services/jokes-mapper.service';
import { IJokeApi } from '../../shared/interfaces/IJokeApi';
import { IJoke } from '../../shared/interfaces/IJoke';
import { Subscription } from 'rxjs';
import { JokesService } from '../../shared/services/jokes.service';
import { FavouriteDisplayService } from './../../shared/services/favourite-display.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})

export class JokesComponent implements OnInit, OnDestroy {
  public jokes: IJoke[] = [];
  public categories: string[] = [];
  public showSidebar = false;
  public jokesForm: FormGroup;

  private jokesSubscription: Subscription = new Subscription();
  private categoriesSubscription: Subscription = new Subscription();

  constructor(
    private favouriteDisplayService: FavouriteDisplayService,
    private jokesService: JokesService,
    private jokesMapperService: JokesMapperService
  ) { }

  ngOnInit() {
    // this.onSubmitForm();
    // this.jokesSubscription = this.jokesService.getJokes()
    //   .subscribe(
    //     (response: IJokeApi) => {
    //       this.jokes.push(this.jokesMapperService.mapJokeApiForJokes(response));
    //     });

    this.jokesService.getCategories()
      .subscribe(
        (categoriesArr: string[]) => {
          this.categories = [...categoriesArr];
        });

    this.jokesForm = new FormGroup({
      jokeOption: new FormGroup({
        jokeControl: new FormControl(null),

        categoriesGroup: new FormGroup({
          category: new FormControl(null)
        }),

        searchGroup: new FormGroup({
          search: new FormControl(null)
        })
      })
    });
  }

  onSubmitForm() {
    console.log(this.jokesForm);

  }

  onToggleSidebar() {
    this.showSidebar = !this.showSidebar;
    this.favouriteDisplayService.onToggleFavourite(this.showSidebar);
  }

  ngOnDestroy() {
    this.jokesSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
  }
}
