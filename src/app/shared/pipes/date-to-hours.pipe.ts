import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToHours'
})
export class DateToHoursPipe implements PipeTransform {

  transform(date: Date): string {
    const currentTime = new Date().getTime();
    const apiDate = new Date(date).getTime();
    return ((currentTime - apiDate) / (1000 * 60 * 60)).toFixed(0);
  }
}
