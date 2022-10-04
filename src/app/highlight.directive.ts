import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements AfterViewInit {
  constructor(private el: ElementRef) {
    console.log('test');
  }

  ngAfterViewInit(): void {
    const text = this.el.nativeElement.textContent;
    this.el.nativeElement.textContent = `${text} ❤️`;
  }
}
