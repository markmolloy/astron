import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {

  @Input('ratio') parallaxRatio : number = 1
  initialBottom : number = 0

  constructor(private eleRef : ElementRef) {
    this.initialBottom = this.eleRef.nativeElement.getBoundingClientRect().bottom
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event){
    this.eleRef.nativeElement.style.bottom = (this.initialBottom - (window.scrollY * this.parallaxRatio)) + 'px'
  }

}
