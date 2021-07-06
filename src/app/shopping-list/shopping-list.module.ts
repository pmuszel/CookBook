import { SharedModule } from './../shared/shared.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { NgModule } from "@angular/core";
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent 
    ],
    imports: [
        FormsModule,
        ShoppingListRoutingModule,
        SharedModule
     ],
})
export class ShoppingListModule {

}