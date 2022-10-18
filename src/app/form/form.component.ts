import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {ItemService} from "../item.service";

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

  name!: string;

  private _price!: number;

  active!: boolean;

  private editMode: boolean = false;

  constructor(private itemService: ItemService) {

  }

  ngOnInit(): void {
    console.log('INIT');
    this.itemService.itemToBeEdited$.checkForChanges((formValue) => {
      console.log(formValue);
      this.editMode = true;

      const { name, price, active } = formValue;

      this.name = name as string;
      this.price = price as number;
      this.active = active as boolean;
    });
    // console.log(this.inputName.nativeElement);
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
      const form: FormValue = {
        name: this.name,
        price: this.price,
        active: this.active,
        creationDate: new Date()
      };

      if (this.editMode) {
        this.editMode = false;
        this.itemService.edit(form);
      } else {
        this.itemService.add(form);
      }

      this.name = '';
      this.price = 0;
      this.active = false;
    }
  }
}
