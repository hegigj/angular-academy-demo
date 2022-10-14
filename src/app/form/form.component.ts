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

  @Input()
  name!: string;

  private _price!: number;

  @Input('isActive')
  active!: boolean;

  @Output()
  formValues: EventEmitter<FormValue> = new EventEmitter<FormValue>();

  constructor() { }

  ngOnInit(): void {
    console.log('INIT');
    console.log(this.inputName.nativeElement);
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

  @Input()
  set price(value: number) {
    console.log(value);
    if (value >= 0) {
      this._price = value;
    }
  }

  add(): void {
    if (this.name && this.price >= 0) {
      this.formValues.emit({
        name: this.name,
        price: this.price,
        active: this.active,
        creationDate: new Date()
      });
      this.name = '';
      this.price = 0;
      this.active = false;
    }
  }
}
