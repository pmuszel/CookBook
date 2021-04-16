import { Ingridient } from './../../shared/ingridient.model';
import { Component, ElementRef,  OnDestroy,  OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  editMode = false;
  editedItemIndex: number;
  editedItem: Ingridient;

  addButtonName = "Add";

  @ViewChild('f', {static: false}) slForm: NgForm;

  constructor(private shoppingListSevice: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListSevice.startedEditing.subscribe(index => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListSevice.getIngridient(index);
      this.addButtonName = "Update";
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });

    });
  }

  onAddItem(form: NgForm) {

    const value = form.value
    const ingridient = new Ingridient(value.name, value.amount);

    if(this.editMode) {
      this.shoppingListSevice.updateIngridient(this.editedItemIndex, ingridient);
    } else {
      this.shoppingListSevice.addIngridient(ingridient);
    }

    this.onClearForm(form);
  }

  onClearForm(form: NgForm) {
    form.reset();
    this.editMode = false;
    this.addButtonName = "Add";
    this.editedItemIndex = null;
    this.editedItem = null;
  }

  onDeleteItem() {
    if(this.editedItem) {
      this.shoppingListSevice.deleteIngridient(this.editedItemIndex);
      this.onClearForm(this.slForm);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
