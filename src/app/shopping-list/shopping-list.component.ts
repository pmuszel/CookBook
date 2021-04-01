import { ShoppingListService } from './shopping-list.service';
import { Ingridient } from './../shared/ingridient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingridientsChangedSubscription: Subscription;

  ingridients: Ingridient[];
  constructor(private shoppingListSevice: ShoppingListService) { }

  ngOnInit() {
    this.ingridients = this.shoppingListSevice.getIngridients();
    this.ingridientsChangedSubscription = this.shoppingListSevice.ingridientsChanged.subscribe(ings => this.ingridients = ings);
  }

  ngOnDestroy() {
    this.ingridientsChangedSubscription.unsubscribe();
  }
}
