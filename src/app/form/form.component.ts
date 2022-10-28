import {Component, OnInit} from '@angular/core';
import {ItemsService} from "../items.service";
import {filter, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  id?: number;
  name!: string;
  private _price!: number;
  active!: boolean;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.itemsService.itemIdEdit$
      .pipe(
        filter(id => id !== null),
        tap(id => this.id = id as number),
        switchMap(id => this.itemsService.get(id as number))
      )
      .subscribe(response => {
        const {name, price, active} = response; // Object destructuring

        this.name = name;
        this.price = price;
        this.active = active;
      });
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    console.log(value);
    if (value >= 0) {
      this._price = value;
    }
  }

  add(): void {
    if (this.name && this.price >= 0) {
      if (this.id) {
        this.itemsService.edit(this.id, {
          name: this.name,
          price: this.price,
          active: this.active
        }).subscribe();
        this.id = undefined;
      }
    }
  }
}
