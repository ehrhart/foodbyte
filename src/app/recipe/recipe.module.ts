import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeComponent} from './recipe/recipe.component';
import {SharedModule} from "../shared/shared.module";
import {RecipesService} from "../service/api/recipes.services";
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { RecipeDetailsDialogComponent } from './recipe-details-dialog/recipe-details-dialog.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import { RecipeCommentComponent } from './recipe-comment/recipe-comment.component';
import {CommentsService} from "../service/api/comments.service";
import { RecipeStatComponent } from './recipe-stat/recipe-stat.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [RecipeComponent, AddDialogComponent, RecipeDetailsDialogComponent, RecipeCommentComponent, RecipeStatComponent, RecipeEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgxChartsModule
  ],
  providers: [RecipesService, CommentsService],
  entryComponents: [
    RecipeDetailsDialogComponent,
    AddDialogComponent,
    RecipeCommentComponent,
    RecipeStatComponent,
    RecipeEditComponent
  ],
})
export class RecipeModule { }
