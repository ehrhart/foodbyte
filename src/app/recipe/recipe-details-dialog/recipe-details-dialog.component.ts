import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl} from "@angular/forms";
import {RecipesService} from "../../service/api/recipes.services";

@Component({
  selector: 'app-recipe-details-dialog',
  templateUrl: './recipe-details-dialog.component.html',
  styleUrls: ['./recipe-details-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class RecipeDetailsDialogComponent implements OnInit {

  rating = new FormControl();


  constructor(public dialogRef: MatDialogRef<RecipeDetailsDialogComponent>,private recipeService: RecipesService,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
    this.dialogRef.afterClosed().subscribe(dialogResult => {

      if ( !dialogResult  || dialogResult[0] !== 'confirm-details' ){
        return;
      }
    });
  }

  public onNoClick(): void {
    this.dialogRef.close(['cancel-details']);
  }

  public parseRecipe(recipeDesciption: string): string[] {
    return recipeDesciption.split('Etape');
  }

  rateRecipe() {
    this.recipeService.rateRecipe(this.data.recipe._id, this.rating.value)
  }

}
