import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  Observable,
  of,
  delay,
  tap,
  debounceTime,
  startWith, bufferCount, switchMap, map, Subject, takeUntil
} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private movies: string[] = [
    'The 100',
    'Blonde',
    'Fight Club',
    'Fast 2 Furious 2',
    'Fast & Furious 3 (Tokyo drift)',
    'Tennis Club'
  ];

  searchControl: FormControl = new FormControl('');
  private untilDestroy = new Subject();

  constructor() {}

  ngOnInit(): void {
    // this.searchControl
    //   .valueChanges
    //   .pipe(
    //     startWith(''),
    //     // debounceTime(700),
    //     // bufferCount(5),
    //     tap(console.log)
    //   )
    //   .subscribe();
  }

  ngOnDestroy(): void {
    this.untilDestroy.next(null);
    this.untilDestroy.complete();
  }

  filteredMovies: Observable<string[]> = this.searchControl
    .valueChanges
    .pipe(
      takeUntil(this.untilDestroy.asObservable()),
      startWith(''),
      debounceTime(700),
      tap(console.log),
      switchMap(searchValue => {
        return of(this.movies).pipe(
          delay(1000),
          map(movies => {
            return movies
              .filter(m => m.toLowerCase()
                .includes(searchValue.toLowerCase())
              );
          })
        );
      })
    );

  netflixMovies: Observable<string[]> = of(this.movies)
    .pipe(
      delay(1000)
    );
}
