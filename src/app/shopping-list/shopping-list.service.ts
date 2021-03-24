import { EventEmitter, Injectable } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingridientsChanged = new EventEmitter<Ingridient[]>();

  private ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Tomatoes', 3),
  ];
  
constructor() { }

  getIngridients() {
    return this.ingridients.slice();
  }

  addIngridient(ingridient:Ingridient) {
    this.ingridients.push(ingridient);
    this.ingridientsChanged.emit(this.getIngridients());
  }

  addIngridients(ingridients: Ingridient[]) {
    this.ingridients.push(...ingridients);
    this.ingridientsChanged.emit(this.getIngridients());
  }



}
