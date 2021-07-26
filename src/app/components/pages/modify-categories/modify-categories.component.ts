import { Component } from '@angular/core';

import { CategoryModel } from '../../../shared/models/joke.model';
import { JokesService } from '../../../shared/services/jokes.service';

@Component({
  selector: 'app-modify-categories',
  templateUrl: './modify-categories.component.html',
  styleUrls: ['./modify-categories.component.scss'],
})
export class ModifyCategoriesComponent {
  public createErrorMessage: string;
  public deleteErrorMessage: string;

  constructor(private jokesService: JokesService) {}

  onCreateCategory(title: string): void {
    this.jokesService.createCategory(title).subscribe(
      (response: CategoryModel) =>
        this.jokesService.openSnackBar(
          `Your category: ${response.title} was created`,
          'Close'
        ),
      (error) => (this.createErrorMessage = error)
    );
  }

  onDeleteCategory(id: number): void {
    this.jokesService.deleteCategory(id).subscribe(
      () => this.jokesService.openSnackBar(`Category was deleted`, 'Close'),
      (error) => (this.deleteErrorMessage = error)
    );
  }
}
