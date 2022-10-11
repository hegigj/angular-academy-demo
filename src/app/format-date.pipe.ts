import {Inject, InjectionToken, Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";

export const local = new InjectionToken('x', {
  factory: () => 'en-US'
});

export const format = new InjectionToken('y', {
  factory: () => 'MMM dd yyyy, HH:mm'
});

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  constructor(
    @Inject(local) private local: string,
    @Inject(format) private format: string,
    private datePipe: DatePipe
  ) {}

  transform(value: string | number | Date): string | null {
    return this.datePipe.transform(value, this.format, '', this.local);
  }

}
