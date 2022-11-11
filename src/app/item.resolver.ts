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
export class ItemResolver implements Resolve<any> {
  constructor(
    private itemService: ItemService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    if (route.paramMap.has('ID')) {
      return this.itemService.get(+(route.paramMap.get('ID') as string)).pipe(
        catchError(() => {
          this.router.navigateByUrl('/not-found');
          return EMPTY;
        })
      )
    }

    this.router.navigateByUrl('/not-found');
    return EMPTY;
  }
}
