import { Component } from '@angular/core';
import {FormValue} from "./form/form.component";
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'demo';
  //
  // count: number = 0;
  //
  // items: FormValue[] = [
  //   {
  //     name: 'Item 1',
  //     price: 3,
  //     active: false,
  //     creationDate: new Date()
  //   }
  // ];
  //
  // asyncData: Observable<string> = of('Hello').pipe(delay(1000));
  //
  // itemToEdit?: FormValue;
  //
  // constructor() {
  //   // setInterval(function (scope) { scope.count++ }, 1000, this);
  // }
  //
  // addItem(values: FormValue): void {
  //   if (this.itemToEdit) {
  //     this.items.splice(
  //       this.items.findIndex(item => item === this.itemToEdit),
  //       1,
  //       values
  //     );
  //   } else {
  //     this.items.unshift(values);
  //   }
  //   // this.items = [values, ...this.items];
  // }
  //
  // editItem(item: FormValue): void {
  //   this.itemToEdit = item;
  //   console.log(this.itemToEdit);
  // }
  //
  // deleteItem(item: FormValue): void {
  //   this.items.splice(this.items.findIndex(i => i === item), 1);
  // }
}
