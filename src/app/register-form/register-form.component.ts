import { Component, OnInit } from '@angular/core';
import {
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {UserModel, UserService} from "../user.service";
import {map, Observable, take, tap} from "rxjs";
import * as constants from "constants";

function MatchValidator(checkControlName: string): ValidatorFn {
  return (control): ValidationErrors | null => {
    if (control && control.value) {
      const form = control.parent;

      if (control.value !== form?.get(checkControlName)?.value) {
        return { notMatch: true };
      }

      return null;
    }

    return { notMatch: true };
  };
}

function AsyncMatchValidator(asyncCall: (value: any) => Observable<boolean>): AsyncValidatorFn {
  return (control): Observable<ValidationErrors | null> => {
    return asyncCall(control.value).pipe(
      map(match => match ? null : { notMatch: true })
    );
  };
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  user: FormGroup;
  tag: FormControl;

  constructor(private userService: UserService) {
    this.user = new FormGroup({
      info: new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required, MatchValidator('firstName')]),
        birthDate: new FormControl(),
        age: new FormControl({ value: 0, disabled: true }, Validators.min(18)),
        idCard: new FormControl()
      }),
      username: new FormControl(),
      email: new FormControl('', [
        Validators.required, Validators.email
      ], AsyncMatchValidator(this.validateEmail.bind(this))),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[0-9]+')
      ]),
      confirmPassword: new FormControl('', MatchValidator('password')),
      tag: new FormArray([
        new FormControl('Simple User')
      ])
    });

    this.tag = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.user.valueChanges
      .pipe(tap(() => console.log(this.user)))
      .subscribe();

    this.userService.getList().subscribe();
  }

  validateEmail(email: string): Observable<boolean> {
    return this.userService.users$.pipe(
      take(1),
      map(users => !users.some(user => user.email === email))
    );
  }

  getTags(): FormArray {
    return this.user.get('tag') as FormArray;
  }

  addTag() {
    const tags = (this.user.get('tag') as FormArray);
    if (this.tag.valid) {
      tags.push(new FormControl(this.tag.value));
      this.tag.reset();
    }
  }
}
