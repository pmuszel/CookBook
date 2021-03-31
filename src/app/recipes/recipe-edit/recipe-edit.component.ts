import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;

  editMode: boolean = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if(id) {
      this.recipe = this.recipeService.getRecipeByIndex(+id);
      this.editMode = true;
      console.log(this.recipe);
    }
  }

}
