import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

import { map, tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

DB_URL = 'https://cookbook-2dbbe-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

constructor(private http: HttpClient, private recipesService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();

    this.http.put(this.DB_URL, recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.DB_URL)
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingridients: recipe.ingridients ? recipe.ingridients : []}
      });
    }),
    tap(recipes => {
      this.recipesService.replaceRecipes(recipes);
      console.log(recipes);
    })
    )
  }
}
