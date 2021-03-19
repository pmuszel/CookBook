import {
  Directive, 
  ElementRef, 
  HostBinding, 
  HostListener, 
  Renderer2 
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
// export class DropdownDirective {

//   @HostBinding('class.open') isOpen = false;

//   constructor(private elementRef: ElementRef, private renderer: Renderer2) { }


//   @HostListener('click') toggleOpen(eventData: Event) {
//     this.isOpen = !this.isOpen;

//     // console.log(this.elementRef.nativeElement);
//     // if(this.elementRef.nativeElement.classList.contains('open')) {
//     //   this.renderer.removeClass(this.elementRef.nativeElement, 'open');
//     // } else {
//     // this.renderer.addClass(this.elementRef.nativeElement, 'open');
//     // }

//   }
// }


export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}
