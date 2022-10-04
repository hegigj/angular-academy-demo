import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dividedBy'
})
export class DividedByPipe implements PipeTransform {

  transform(value: string | number): unknown {
    if (typeof value === 'string') {
      value = +value;
    }

    if ((value / 1000000) >= 1) {
      return (value / 1000000) + 'M';
    }

    if ((value / 1000) >= 1) {
      return (value / 1000) + 'K'
    }

    return value;
  }

}
