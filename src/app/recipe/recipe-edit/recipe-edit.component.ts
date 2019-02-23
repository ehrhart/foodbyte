import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {RecipesService} from "../../service/api/recipes.services";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RecipeEditComponent>,
              private recipeService: RecipesService,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }


  ngOnInit() {
    this.dialogRef.afterClosed().subscribe(dialogResult => {

      if (!dialogResult || dialogResult[0] !== 'confirm-stats') {
        return;
      }
    });

  }

  public onNoClick(): void {
    this.dialogRef.close(['cancel-stats']);
  }

}
