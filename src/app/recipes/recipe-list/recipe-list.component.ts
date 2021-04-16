import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];

  recipesChengedSubscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {

    this.recipesChengedSubscription =  this.recipeService.recipesChanged.subscribe(recipes => {
      this.recipes = recipes;
    });

    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.recipesChengedSubscription.unsubscribe();
  }

}
