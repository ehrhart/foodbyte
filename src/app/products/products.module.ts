import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import {SharedModule} from "../shared/shared.module";
<<<<<<< HEAD
import {ProductsService} from "../service/api/products.service";
//import { AddDialogComponent } from './add-dialog/add-dialog.component';
//import { RecipeDetailsDialogComponent } from './recipe-details-dialog/recipe-details-dialog.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
//import { RecipeCommentComponent } from './recipe-comment/recipe-comment.component';
//import {CommentsService} from "../service/api/comments.service";
=======
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
>>>>>>> 36f4eed594f4e136221221ca7910b8bf6c403ee9

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    SharedModule,
<<<<<<< HEAD
    BrowserAnimationsModule,
    BrowserModule,
  ],
  providers: [ProductsService],
  //entryComponents: [
    //RecipeDetailsDialogComponent,
    //AddDialogComponent,
    //RecipeCommentComponent
  //],
  
=======
    BrowserAnimationsModule
  ]
>>>>>>> 36f4eed594f4e136221221ca7910b8bf6c403ee9
})
export class ProductsModule { }
