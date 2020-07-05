import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FormMapperService {

  constructor(private apiService: ApiService) {}

  mapFormDataForApiResponse(form: FormGroup): string{
    switch (form.value.jokeControl) {
      case 'random':
        return `${this.apiService.getApiString()}/random`;
      case 'categories':
        return `${this.apiService.getApiString()}/random?category=${form.value.jokeCategoryGroup.category}`;
      case 'search':
        return `${this.apiService.getApiString()}/search?query=${form.value.jokeSearchGroup.search}`;
    }
  }
}
