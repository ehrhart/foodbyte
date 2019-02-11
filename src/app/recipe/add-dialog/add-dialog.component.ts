import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProductsService} from "../../service/api/products.service";
import {Ingridient} from "../../Models/Ingridient";
import {Recipe} from "../../Models/Recipe";
import {RecipesService} from "../../service/api/recipes.services";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddDialogComponent implements OnInit {

  public recipeSteps: string[] = [""];

  ingredientsList: Ingridient[] = [];

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>, public productsService: ProductsService, private recipeService: RecipesService,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  ngOnInit() {

    this.productsService.getIngridents().subscribe((data: any[]) => {
      console.log(data);
      for (let entry of data) {
        for (let entryLevel2 of entry.map(e => e)) {
          this.ingredientsList.push(entryLevel2); // 1, "string", false

        }
        console.log(entry);
      }

      // this.ingredientsList = data.map(e => e.text)
    });

    this.dialogRef.afterClosed().subscribe(dialogResult => {

      if (!dialogResult || dialogResult[0] !== 'confirm-add') {
        return;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close(['cancel-add']);
  }

  get name(): FormControl {
    return this.data.form.controls.name as FormControl;
  }

  get toppings(): FormControl {
    return this.data.form.controls.ingredients as FormControl;
  }

  get desciption(): FormControl {
    return this.data.form.controls.desciption as FormControl;
  }

  removeRecipeStep(i) {
    console.log(this.recipeSteps);
    this.recipeSteps.slice(i, 1);
  }

  addRecipeStep() {
    const formData = this.data.form.getRawValue();
    this.recipeSteps.push(formData['desciption']);
  }

  public addRecipe(): void {
    const formData = this.data.form.getRawValue();
    let slectedIngrdient: Ingridient[] = formData['ingredients'];
    let selectedIngrdientsText: string[] = slectedIngrdient.map(e => e.text);

      this.recipeSteps.push(formData['desciption']);
    let recipeToPost: Recipe = new Recipe(null, formData['name'],
      formData['desciption'],
      selectedIngrdientsText,
        null,
        null,
        "haroun");
   console.log(recipeToPost);
    this.recipeService.postRecipes(recipeToPost);
  }
}
