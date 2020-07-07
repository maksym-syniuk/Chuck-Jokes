import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FormMapperService {

  constructor(private apiService: ApiService) { }

  mapFormDataForApiResponse(value): string {
    switch (value.jokeControl) {
      case 'random':
        return `${this.apiService.getApiString()}/random`;
      case 'categories':
        return `${this.apiService.getApiString()}/random?category=${value.jokeCategoryGroup.category}`;
      case 'search':
        return `${this.apiService.getApiString()}/search?query=${value.jokeSearchGroup.search}`;
    }
  }
}
