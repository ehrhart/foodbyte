import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from './products/products.component';
import {SharedModule} from "../shared/shared.module";
import {ProductsService} from "../service/api/products.service";
//import { AddDialogComponent } from './add-dialog/add-dialog.component';
//import { RecipeDetailsDialogComponent } from './recipe-details-dialog/recipe-details-dialog.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
//import { RecipeCommentComponent } from './recipe-comment/recipe-comment.component';
//import {CommentsService} from "../service/api/comments.service";

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
  providers: [ProductsService],
  //entryComponents: [
  //RecipeDetailsDialogComponent,
  //AddDialogComponent,
  //RecipeCommentComponent
  //],

})
export class ProductsModule {
}
