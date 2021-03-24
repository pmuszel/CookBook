import { Ingridient } from './../../shared/ingridient.model';
import { Component, ElementRef,  OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;

  constructor(private shoppingListSevice: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    this.shoppingListSevice.addIngridient(new Ingridient(this.nameInputRef.nativeElement.value, 
                                       this.amountInputRef.nativeElement.value)
                       );
  }
}
