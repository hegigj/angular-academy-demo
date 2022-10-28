import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  EventEmitter, Inject,
  Input,
  OnChanges, OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormValue} from "../form/form.component";
import {ItemModel, ItemsService} from "../items.service";

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
        #{{i}} {{(i % 2 === 0 ? (item?.name | titlecase) : (item?.name | uppercase))}} - {{item?.price | number: '1.0-2' | currency: 'USD':'code'}} . Created at: {{ item?.creationDate | formatDate}}
        <button class="btn btn-primary" (click)="edit(item)">Edit</button>
        <button class="btn btn-danger" (click)="delete(item)">Delete</button>
        <ng-content></ng-content>
      </li>
    </ng-template>
  `
})
export class ListComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked {
  itemList: ItemModel[] = [];

  edit(item: ItemModel): void {
    this.itemsService.onEdit(item.id);
  }

  delete(item: ItemModel): void {
    if (confirm('Are you sure to delete this item?')) {
      this.itemsService.delete(item.id).subscribe(this.getList.bind(this));
    }
  }

  // @Output('delete')
  // onDelete: EventEmitter<FormValue> = new EventEmitter<FormValue>();

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.getList();
  }

  private getList(): void {
    this.itemsService.getList()
      .subscribe(response => this.itemList = response);
  }

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
