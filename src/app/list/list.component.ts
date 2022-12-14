import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormValue} from "../form/form.component";

@Component({
  selector: 'app-list',
  template: `
<!--    <ng-content select="h2"></ng-content>-->
<!--    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--    <ng-content></ng-content>-->
    <ng-container *ngIf="itemList?.length; else ref">
      <ul class="list-group">
        <ng-container *ngFor="let item of itemList;let i=index">
          <ng-container *ngTemplateOutlet="link; context: { $implicit: i + 1, item: item }"></ng-container>
        </ng-container>
      </ul>
    </ng-container>
    <ng-template #ref>
      <h3 class="text-center">No items, add one...</h3>
    </ng-template>
    <ng-template #link let-item="item" let-i>
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        [ngClass]="{'bg-primary': item.active}"
        [ngStyle]="{'font-weight': item.active ? 700 : 500}"
      >
<!--        {{item | json}}-->
        #{{i}} {{(i % 2 === 0 ? (item?.name | titlecase) : (item?.name | uppercase)) | slice: 0:3}} - {{item?.price | number: '1.0-2' | currency: 'USD':'code'}} . Created at: {{ item?.creationDate | formatDate}}
        <button class="btn btn-primary" (click)="edit(item)">&#xF78A;</button>
        <ng-content></ng-content>
      </li>
    </ng-template>
  `
})
export class ListComponent implements OnChanges, AfterContentInit, AfterContentChecked {
  @Input('list')
  itemList!: FormValue[];

  @Output('edit')
  onEdit: EventEmitter<FormValue> = new EventEmitter<FormValue>();

  edit(item: FormValue): void {
    this.onEdit.emit(item);
  }

  // @Output('delete')
  // onDelete: EventEmitter<FormValue> = new EventEmitter<FormValue>();

  constructor() { }

  ngAfterContentInit(): void {
    console.log('CONTENT INIT');
  }

  ngAfterContentChecked(): void {
    console.log('Content Checked');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes', changes);
  }

  // deleteItem(item: FormValue): void {
  //   this.onDelete.emit(item);
  // }
}
