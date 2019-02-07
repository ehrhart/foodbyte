import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeComponent} from './recipe/recipe.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [RecipeComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RecipeModule { }
