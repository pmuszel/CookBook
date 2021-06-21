import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirevtive {
    constructor(public viewContainerRef: ViewContainerRef) {}
}