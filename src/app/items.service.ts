import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

export interface ItemModel {
  id: number;
  name: string;
  price: number;
  active: boolean;
  creationDate: string;
  modifiedDate: string | null;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly api: string;
  private itemIdEdit: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  itemIdEdit$: Observable<number | null> = this.itemIdEdit.asObservable();

  constructor(private httpClient: HttpClient) {
    this.api = 'api/items';
  }

  getList(): Observable<ItemModel[]> {
    return this.httpClient.get<ItemModel[]>(this.api);
  }

  get(id: number): Observable<ItemModel> {
    return this.httpClient.get<ItemModel>(`${this.api}/${id}`);
  }

  onEdit(id: number): void {
    this.itemIdEdit.next(id);
  }

  edit(id: number, item: Pick<ItemModel, 'name' | 'price' | 'active'>): Observable<ItemModel> {
    const now: string = new Date().toISOString();
    return this.httpClient.put<ItemModel>(`${this.api}/${id}`, {
      ...item,
      modifiedDate: now
    });
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.api}/${id}`);
  }
}
