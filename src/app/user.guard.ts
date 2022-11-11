import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanLoad {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const { users } = route.data;
    return this.canAccess(users);
  }

  canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const { users } = route.data as any;
    return this.canAccess(users);
  }

  private async canAccess(users: string[]): Promise<boolean> {
    if (users.includes(this.userService.getUser() || '')) return true;

    await this.router.navigateByUrl('/not-found');
    return false;
  }
}
