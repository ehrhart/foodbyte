import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Product} from "../../Models/Product";
import {RecipesService} from "../../service/api/recipes.services";

@Component({
  selector: 'app-recipe-stat',
  templateUrl: './recipe-stat.component.html',
  styleUrls: ['./recipe-stat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeStatComponent implements OnInit {

  public filtredRecipeProducts: Array<Product> = [];

  constructor(public dialogRef: MatDialogRef<RecipeStatComponent>,
              private recipeService: RecipesService,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
    this.recipeService.getRecipeProducts(this.data.recipe._id).subscribe( products => {
      this.filtredRecipeProducts = products;
    });
    this.dialogRef.afterClosed().subscribe(dialogResult => {

      if ( !dialogResult  || dialogResult[0] !== 'confirm-stats' ){
        return;
      }
    });

  }

  public onNoClick(): void {
    this.dialogRef.close(['cancel-stats']);
  }

}
