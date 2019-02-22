import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormControl} from "@angular/forms";
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

  @ViewChild('fileInput') public fileInput: ElementRef;


  public recipeSteps: string[] = [""];
  public displayCloseButton: boolean = false;

  ingredientsList: Ingridient[] = [];
  slectedIngrdient:Ingridient[]= [];
  selectedIngrdientsText: string[] = [""];


  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              private fileLoader: FormBuilder,
              public productsService: ProductsService,
              private recipeService: RecipesService,
              private changeDetector: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  ngOnInit() {

    this.productsService.getIngridents().subscribe((data: any[]) => {
      for (let entry of data) {
        for (let entryLevel2 of entry.map(e => e)) {
          this.ingredientsList.push(entryLevel2);

        }
      }
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

  get image_url(): FormControl {
    return this.data.form.controls.image_url as FormControl;
  }

  removeRecipeStep(key) {
    const index = this.recipeSteps.indexOf(key, 0);
    if (index > -1) {
      this.recipeSteps.splice(index, 1);
    }
  }

  addRecipeStep(i:number) {
    const formData = this.data.form.getRawValue();
    this.recipeSteps.push(' Etape '+i+formData['desciption']);

  }

  public addRecipe(): void {
    const formData = this.data.form.getRawValue();
    if(formData['ingredients']) {
      this.slectedIngrdient = formData['ingredients'];
      this.selectedIngrdientsText = this.slectedIngrdient.map(e => e.text);
    }
    this.recipeSteps.push(formData['desciption']);
    let recipeToPost: Recipe = new Recipe(null, formData['name'],
      this.concatinateStringArray(),
      null,
      null,
      null,
      "haroun",
      null,
      formData['image_url'],
      null);
    this.recipeService.postRecipes(recipeToPost);
    this.onNoClick();
  }

  public concatinateStringArray() {
    let result = "";
    for (let string of this.recipeSteps) {
      result = result + string;
    }
    return result;
  }

  onFileChange(event) {
    this.data.form = this.fileLoader.group({
      uploadedFile: null
    });

    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [uploadedFile] = event.target.files;
      reader.readAsDataURL(uploadedFile);
      reader.onload = () => {
        this.data.form.setValue({
          image_url: uploadedFile.path,
        });
        this.changeDetector.markForCheck();
      };
    }
    this.displayCloseButton = true;
    return this.data.form;
  }

  public removeFile(): void {
    this.fileInput.nativeElement.value ="";
    if (this.data.form.get('uploadedFile')) {
      this.data.form.get('uploadedFile').setValue(null);
    }
  }

}
