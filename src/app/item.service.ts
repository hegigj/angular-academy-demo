import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly url: string = 'api/items';
  constructor(private httpClient: HttpClient) { }

  getList(): Observable<any> {
    return this.httpClient.get<any>(this.url);
  }

  get(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/${id}`);
  }
}
