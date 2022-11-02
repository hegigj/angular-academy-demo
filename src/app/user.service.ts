import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

export interface UserModel {
  id: number,
  mockToken: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  idCard: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly api: string;

  private users: BehaviorSubject<UserModel[]>;
  users$: Observable<UserModel[]>;

  constructor(private httpClient: HttpClient) {
    this.api = environment.api + '/users';
    this.users = new BehaviorSubject<UserModel[]>([]);
    this.users$ = this.users.asObservable();
  }

  getList(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.api)
      .pipe(
        tap(users => this.users.next(users))
      );
  }

  create(user: Omit<UserModel, 'id'>): Observable<UserModel> {
    // const users: UserModel[] = this.users.getValue();
    return this.httpClient.post<UserModel>(this.api, user);
  }
}
