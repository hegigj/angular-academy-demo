import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ItemsService} from "../items.service";
import {filter, switchMap, tap} from "rxjs";
import {NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit {
  @ViewChild('formRef') form?: NgForm;

  id?: number;

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

        this.form?.form?.patchValue({
          name,
          price,
          active: !!active
        });

        this.form?.form.get('active')?.enable();
        this.form?.form
          .get('price')
          ?.setValidators([Validators.required, Validators.min(0)]);

        // setTimeout(() => this.form?.form.get('name')?.setValue('X'), 1000);
      });
  }

  ngAfterViewInit(): void {
    console.log(this.form?.form);
    console.log(this.form?.form.getRawValue());
    this.form?.form.valueChanges.subscribe(value => {
      console.log(value);
      console.log(this.form?.form.getRawValue());
    });
  }

  add(e: any): void {
    console.log(e);
    if (this.form?.valid) {
      if (this.id) {
        const { name, price, active} = this.form?.form?.getRawValue();
        console.log(name, price, active);
        this.itemsService.edit(this.id, {
          name,
          price,
          active
        }).subscribe();
        this.id = undefined;
      }
    }
  }
}
