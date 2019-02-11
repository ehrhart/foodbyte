import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeComponent} from './recipe/recipe.component';
import {SharedModule} from "../shared/shared.module";
import {RecipesService} from "../service/api/recipes.services";
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { RecipeDetailsDialogComponent } from './recipe-details-dialog/recipe-details-dialog.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {CommunicationService} from "../service/communication.service";

@NgModule({
  declarations: [RecipeComponent, AddDialogComponent, RecipeDetailsDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
  providers: [RecipesService],
  entryComponents: [
    RecipeDetailsDialogComponent,
    AddDialogComponent
  ],
})
export class RecipeModule { }
