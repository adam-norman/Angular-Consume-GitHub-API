import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysFromDate'
})
export class DaysFromDatePipe implements PipeTransform {

  transform(OrigDate: string, ...args: unknown[]): number {
  const currentDate = new Date();
  const passedDate = new Date(OrigDate);
  const differenceInTime = currentDate.getTime() - passedDate.getTime();
  return Math.round(differenceInTime / (1000 * 3600 * 24));
  }
}
