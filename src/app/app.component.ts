import { Component } from '@angular/core';
import {FormValue} from "./form/form.component";
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';

  count: number = 0;

  asyncData: Observable<string> = of('Hello').pipe(delay(1000));

  constructor() {
    // setInterval(function (scope) { scope.count++ }, 1000, this);
  }
}
