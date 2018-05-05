import { Component } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RecipeService]
})
export class AppComponent {
  current_location = 'recipe';

  onNavigate(location: string) {
    this.current_location = location;
  }

  showRecipe() {
    return this.current_location === 'recipe';
  }

  showShoppingList() {
    return this.current_location === 'shopping-list';
  }
}
