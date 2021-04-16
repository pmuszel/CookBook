import { Injectable } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';

import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingridientsChanged = new Subject<Ingridient[]>();

  startedEditing = new Subject<number>();

  private ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Tomatoes', 3),
  ];
  
constructor() { }

  getIngridients() {
    return this.ingridients.slice();
  }

  getIngridient(index: number) {
    return this.ingridients[index];
  }

  addIngridient(ingridient:Ingridient) {
    this.ingridients.push(ingridient);
    this.ingridientsChanged.next(this.getIngridients());
  }

  addIngridients(ingridients: Ingridient[]) {
    this.ingridients.push(...ingridients);
    this.ingridientsChanged.next(this.getIngridients());
  }

  updateIngridient(index: number, ingridient: Ingridient) {
    this.ingridients.splice(index, 1, ingridient);
    this.ingridientsChanged.next(this.getIngridients());
  }

  deleteIngridient(index:number) {
    this.ingridients.splice(index, 1);
    this.ingridientsChanged.next(this.getIngridients());
  }
}
