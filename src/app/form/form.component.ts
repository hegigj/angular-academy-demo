import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ItemsService} from "../items.service";
import {filter, switchMap, tap} from "rxjs";

export interface FormValue {
  name: string;
  price: number;
  active: boolean;
  creationDate: Date;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('x') inputName!: ElementRef<HTMLInputElement>;

  id?: number;
  name!: string;
  private _price!: number;
  active!: boolean;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    console.log('INIT');

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

  ngAfterViewInit(): void {
    console.log('After View Init');
    console.log(this.inputName.nativeElement);
  }

  ngAfterViewChecked(): void {
    console.log('After View Checked');
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
