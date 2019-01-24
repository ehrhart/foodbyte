import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RecipeComponent} from './recipe/recipe.component';

const routes: Routes = [{
  path: 'recipe',
  children: [{
    path: 'recipe',
    component: RecipeComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RecipeRoutingModule {
}
