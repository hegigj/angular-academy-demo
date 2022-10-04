import { Component } from '@angular/core';
import {FormValue} from "./form/form.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';

  count: number = 0;

  items: FormValue[] = [];

  itemToEdit?: FormValue;

  constructor() {
    // setInterval(function (scope) { scope.count++ }, 1000, this);
  }

  addItem(values: FormValue): void {
    if (this.itemToEdit) {
      this.items.splice(
        this.items.findIndex(item => item === this.itemToEdit),
        1,
        values
      );
    } else {
      this.items.unshift(values);
    }
    // this.items = [values, ...this.items];
  }

  editItem(item: FormValue): void {
    this.itemToEdit = item;
    console.log(this.itemToEdit);
  }

  deleteItem(item: FormValue): void {
    this.items.splice(this.items.findIndex(i => i === item), 1);
  }
}
