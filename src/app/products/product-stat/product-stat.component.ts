import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {StatModel} from "../../Models/StatModel";
import {Product} from "../../Models/Product";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ProductsService} from "../../service/api/products.service";
import {RecipesService} from "../../service/api/recipes.services";

@Component({
  selector: 'app-product-stat',
  templateUrl: './product-stat.component.html',
  styleUrls: ['./product-stat.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ProductStatComponent implements OnInit {

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
  public ServingNutriments: StatModel[] = [];


  public filtredRecipeProducts: Array<Product> = [];

  constructor(public dialogRef: MatDialogRef<ProductStatComponent>,
              public productsService: ProductsService,
              private recipeService: RecipesService,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  ngOnInit() {

    this.scoreStat.push(new StatModel('Sodium', this.data.product.nutriments[0].sodium_100g));
    this.scoreStat.push(new StatModel('Sugar', this.data.product.nutriments[0].sugars_100g));
    this.scoreStat.push(new StatModel('Protein', this.data.product.nutriments[0].proteins_100g));
    this.scoreStat.push(new StatModel('Salt', this.data.product.nutriments[0].salt_100g));
    this.scoreStat.push(new StatModel('Fat', this.data.product.nutriments[0].fat_100g));
    this.scoreStat.push(new StatModel('carbohydrates', this.data.product.nutriments[0].carbohydrates_100g));


    this.ServingNutriments.push(new StatModel('sugars_serving', this.data.product.nutriments[0].sugars_serving));
    this.ServingNutriments.push(new StatModel('salt_serving', this.data.product.nutriments[0].salt_serving));
    this.ServingNutriments.push(new StatModel('fat_serving', this.data.product.nutriments[0].fat_serving));
    this.ServingNutriments.push(new StatModel('proteins_serving', this.data.product.nutriments[0].proteins_serving));





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
