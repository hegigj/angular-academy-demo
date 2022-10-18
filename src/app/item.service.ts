import { Injectable } from '@angular/core';
import {FormValue} from "./form/form.component";
import {BehaviorSubject, Observable} from "rxjs";

type MyFn<TYPE> = (value: TYPE) => void;

class MySubject<TYPE> {
  private onSetValueFns: MyFn<TYPE>[] = [];

  constructor(private value: TYPE) {}

  setValue(value: TYPE): void { // next
    this.value = value;
    this.onSetValueFns.forEach(fn => fn(this.value));
  }

  checkForChanges(fn: MyFn<TYPE>): void { // subscribe
    this.onSetValueFns.push(fn);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemList: FormValue[];

  private itemToBeEdited: MySubject<Partial<FormValue>>

  constructor() {
    this.itemList = [];
    this.itemToBeEdited = new MySubject<Partial<FormValue>>({});
  }

  get list(): FormValue[] {
    return this.itemList;
  }

  onEdit(form: FormValue): void {
    this.itemToBeEdited.setValue(form);
  }

  get itemToBeEdited$(): MySubject<Partial<FormValue>> {
    return this.itemToBeEdited;
  }

  add(form: FormValue): void {
    if (form) {
      this.itemList.unshift(form);
    } else {
      alert('Formi duhet plotesuar');
    }
  }

  edit(form: FormValue): void {
    if (form) {
      this.itemList.splice(
        this.itemList.indexOf(form),
        1,
        form
      );
    } else {
      alert('Gabim gjat editimit');
    }
  }

  delete(form: Partial<FormValue>): void { // {}
    if (form) {
      const toBeDeleted: number = this.itemList.findIndex(item => {
        return (
          form?.name === item.name ||
          form?.creationDate === item.creationDate
        );
      }); // 0

      if (toBeDeleted >= 0) {
        this.itemList.splice(toBeDeleted, 1);
      } else {
        alert('Item nuk u gjet');
      }
    } else {
      alert('Gabim gjat deletit');
    }
  }
}
