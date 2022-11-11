import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: FormControl;

  constructor(private userService: UserService) {
    this.user = new FormControl(undefined, Validators.required);
  }

  ngOnInit(): void {
    this.user.valueChanges
      .pipe(
        tap(value => this.userService.loginOrSwitch(value))
      )
      .subscribe();
  }

}
