import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, EMPTY, Observable, of} from 'rxjs';
import {ItemService} from "./item.service";

@Injectable({
  providedIn: 'root'
})
export class ItemsResolver implements Resolve<any[]> {
  constructor(
    private itemService: ItemService,
    private router: Router
  ) {}
  resolve(): Observable<any[]> {
    return this.itemService.getList().pipe(
      catchError(() => {
        this.router.navigateByUrl('/not-found');
        return EMPTY;
      })
    )
  }
}
