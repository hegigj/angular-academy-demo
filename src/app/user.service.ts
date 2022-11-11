import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user?: string;

  constructor() { }

  loginOrSwitch(user?: string): void {
    console.log(user);
    this.user = user || undefined;
  }

  getUser(): string | undefined {
    return this.user;
  }
}
