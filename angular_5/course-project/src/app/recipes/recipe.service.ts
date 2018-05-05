import { EventEmitter, Injectable} from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export  class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe 1',
      'A Test Recipe',
      'http://www.seriouseats.com/images/2016/05/20160503-fava-carrot-ricotta-salad-recipe-1.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Test Recipe 2',
      'A Test Recipe',
      'http://www.seriouseats.com/images/2016/05/20160503-fava-carrot-ricotta-salad-recipe-1.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Vegetables', 20)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
