import { Ingridient } from './../../shared/ingridient.model';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;

  @Output() itemAdded = new EventEmitter<Ingridient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    this.itemAdded.emit(new Ingridient(this.nameInputRef.nativeElement.value, 
                                       this.amountInputRef.nativeElement.value)
                       );
  }
}
