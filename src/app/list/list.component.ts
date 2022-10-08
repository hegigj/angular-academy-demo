import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormValue } from '../form/form.component';

@Component({
  selector: 'app-list',
  template: `
    <!--    <ng-content select="h2"></ng-content>-->
    <!--    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <!--    <ng-content></ng-content>-->
    <ng-container *ngIf="itemList?.length; else ref">
      <div style="gap: 10%;">
        <ul class="list-group">
          <ng-container *ngFor="let item of itemList">
            <li
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              {{ item?.name }} - $ {{ item?.price }}
              <div style="margin: 0.75rem;">
                <button class="btn btn-primary" (click)="edit(item)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>
              </div>
              <div style="margin: 0.75rem;">
                <button class="btn btn-danger" (click)="delete(item)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                    />
                  </svg>
                </button>
              </div>
              <ng-content></ng-content>
            </li>
          </ng-container>
        </ul>
      </div>
    </ng-container>
    <ng-template #ref>
      <h3 class="text-center">No items, add one...</h3>
    </ng-template>
  `,
})
export class ListComponent
  implements OnChanges, AfterContentInit, AfterContentChecked
{
  @Input('list')
  itemList!: FormValue[];

  @Output('edit')
  onEdit: EventEmitter<FormValue> = new EventEmitter<FormValue>();

  edit(item: FormValue): void {
    this.onEdit.emit(item);
  }

  @Output('delete')
  onDelete: EventEmitter<FormValue> = new EventEmitter<FormValue>();

  delete(item: FormValue): void {
    this.onDelete.emit(item);
  }
  // @Output('delete')
  // onDelete: EventEmitter<FormValue> = new EventEmitter<FormValue>();

  constructor() {}

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
