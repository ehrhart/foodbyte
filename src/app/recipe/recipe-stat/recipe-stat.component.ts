import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Product} from "../../Models/Product";
import {RecipesService} from "../../service/api/recipes.services";
import {ProductsService} from "../../service/api/products.service";
import {promise} from "selenium-webdriver";
import {StatModel} from "../../Models/StatModel";

@Component({
  selector: 'app-recipe-stat',
  templateUrl: './recipe-stat.component.html',
  styleUrls: ['./recipe-stat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeStatComponent implements OnInit {

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  timeline = true;
  view: any[] = [700, 400];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#3361FF', '#FF8A33' , '#F5110A' ]
  };

  // line, area
  autoScale = true;

  //pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  public scoreStat : StatModel[] = [];


  public filtredRecipeProducts: Array<Product> = [];

  constructor(public dialogRef: MatDialogRef<RecipeStatComponent>,
              public productsService: ProductsService,
              private recipeService: RecipesService,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  ngOnInit() {

    for (let product of this.data.recipe.products) {
      this.scoreStat.push(new StatModel(product.name, product.score));
    }


    this.recipeService.getRecipeProducts(this.data.recipe._id).subscribe(products => {
      this.filtredRecipeProducts = products;
    });
    this.dialogRef.afterClosed().subscribe(dialogResult => {

      if (!dialogResult || dialogResult[0] !== 'confirm-stats') {
        return;
      }
    });

  }

  public onNoClick(): void {
    this.dialogRef.close(['cancel-stats']);
  }

  public getRecipeScore() {
    let somme = 0;
    for (let score of this.data.recipe.products.map(e => e.score)) {
      somme = somme + score;
    }
    return somme / this.data.recipe.products.length;

  }

}
