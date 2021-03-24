import { ShoppingListService } from './shopping-list.service';
import { Ingridient } from './../shared/ingridient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingridients: Ingridient[];
  constructor(private shoppingListSevice: ShoppingListService) { }

  ngOnInit() {
    this.ingridients = this.shoppingListSevice.getIngridients();
    this.shoppingListSevice.ingridientsChanged.subscribe(ings => this.ingridients = ings);
  }
}
